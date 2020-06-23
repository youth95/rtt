const fs = require('fs-extra');
const chokidar = require('chokidar');
const { join, relative } = require('path');
const paths = require('../config/paths');

function copy() {
  const copyTemplatesPath = join(paths.appTemplates, 'copy');
  fs.readdirSync(copyTemplatesPath).forEach(filename => {
    const src = join(copyTemplatesPath, filename);
    const dist = join(paths.appTemp, filename);
    // 直接复制
    fs.copyFileSync(src, dist);
    console.log(`copy ${src} to ${dist}`);
  });
}
module.exports.copy = copy;



function generatRouter() {
  const excludes = [
    'context',
    'hooks',
    'components',
    'utils',
  ];
  const pathIncluesEcludes = path => excludes.some(search => path.includes(search));
  /**
   * 需求: 约定路由
   * 以下为合法的路由 路由挂载的必要原因是目录下存在index.tsx, 其余情况不挂载。特别的当路径中存在排除项时
   * pages/index.tsx => path: /
   * pages/help/index.tsx => path: /help
   * 不支持路由参数
   * pages/[id]/index.tsx => path: /xxx params: id = xxx
   * pages/[id]/[id]/index.tsx => ...
   */

  /**
   * 递归访问路径
   * @param {string} path 路径
   */
  function DFSPath(path, vist) {
    if (!pathIncluesEcludes(path)) {
      if (path.endsWith('index.tsx')) {
        vist(path);
      }
      if (fs.statSync(path).isDirectory()) {
        fs.readdirSync(path).forEach(filename => DFSPath(join(path, filename), vist));
      }
    }
  }
  const result = [];
  // <Route path="/help" component={loadable(() => import("../pages/help/index"))} />
  DFSPath(paths.appPages, str => {
    result.push({
      path: `/${relative(paths.appPages, str).replace('/index.tsx', '')}`,
      import: `../pages/${relative(paths.appPages, str).replace('.tsx', '')}`,
    })
  });
  return result;
}

function generatRouterCodeFile() {
  const routes = generatRouter();
  const codeTemplate = `import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import loadable from "./loadable";

const Routes = () => (
  <BrowserRouter>
{/* Routes */}
  </BrowserRouter>
);

export default Routes;
`;
  const routesCodes = routes.map(item => `    <Route path="${item.path}" component={loadable(() => import("${item.import}"))} />`).join('\n');
  const codes = codeTemplate.replace('{/* Routes */}', routesCodes);
  fs.writeFileSync(join(paths.appTemp, 'routers.tsx'), codes);
  console.log(`generat ${routes.length} routes`);
}

module.exports.generatRouter = generatRouter;
module.exports.generatRouterCodeFile = generatRouterCodeFile;

function gen() {
  copy();
  generatRouterCodeFile();
}
module.exports.gen = gen;

function start() {
  gen();
  chokidar.watch([paths.appPages, paths.appTemplates])
    .on('add', gen)
    .on('unlink', gen);
}

module.exports.start = start;
