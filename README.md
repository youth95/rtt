# rtt

基于 [Create React App](https://github.com/facebook/create-react-app) 的脚手架。

## 特性

* [x] 支持typescript
* [x] 支持jest
* [x] 支持lint
* [x] 支持docker
* [x] 支持commit message lint hook
* [x] 支持commit coverage lint hook
* [x] 支持自动生成change log
* [x] 支持自动tag
* [x] 支持react-router
* [x] 支持懒加载
* [x] 支持约定式路由
* [x] 集成 @testing-library/react-hooks
* [x] 集成 @emotion/styled @emotion/core
* [x] 集成 antd

## 如何使用

1. git clone 本仓库
2. 修改package.json 中的 name 和 version
3. git remote set-url origin 本仓库地址 你的仓库地址
4. git push -u master origin 完成项目初始化

## 项目管理中的理念

1. 版本只有两种，一种叫大版本，一种叫小版本，两者之间只存在交付时间的界限，根据团队能力不同而定，比如两周以内实现的一次功能迭代，叫小版本，那么两周以外实现的功能迭代就是大版本。
2. 版本的最后一位数字是patch次数，即修改了多少次，无论是由于什么原因。
3. change log 只在版本迭代发布上线前修改。

## 工作准则

1. 使用git cz 提交changes
2. 分支 master release develop 都是受保护的 只允许 merge 不允许 push
3. 当需要部署时,**必须**使用yarn version 来修改版本号

## 提倡的工作流

### 版本迭代

1. 产品经理在仓库的issues中提出本次迭代的需求。
2. 程序员拆分子issues （如果有必要的话）
3. 程序员在子issues上从develop分支上切出特性分支开始工作。
4. 程序员需要在这个特性分支的最后一次提交的commit message 的footer里关闭此子 issues。
5. 程序员将此特性分支push到远程并向develop分支发起mr。
6. 另一个或多个程序员审核通过后，合并特性分支至develop并删除该特性分支。
7. 当所有的子issues都完成后，修改version, version的命名规则与tag一致,发布change log,将develop merge 到release 分支，在release上打入tag，tag的命名规则为a.b.0-rX，其中a为大迭代版本号，b为小迭代版本号，X为提测次数。
8. 当几轮测试同过后将指定的tag合入master，并在master上打tag，tag命名为a.b.0。

### relase过程中的bug修改

1. 首次提测的版本号一定为a.b.0-r0。
2. 提出bug的时候,develop分支可能已经开始进行下一个迭代了。
3. 当需要修改测试提出的bug时,从a.b.0-r0上切出一个分支,名称为a.b.0-r0-bug-fix，在其身上修改bug。
4. 当完全修改完成后,将a.b.0-r0-bug-fix 合入 release 分支, 将a.b.0-r0-bug-fix删除, 在release上打tag, 名为a.b.0-r1。继续提交测试。
5. 若还存在修改,则重复3-4
6. 当测试确认没有问题了,修改version为a.b.0,发布change log,将release合入master,在master上打tag,名为a.b.0，发布到生产环境。

### 当生产环境出bug了

1. 从a.b.0上切出分支,名称命名为,a.b.0-hot-fix。
2. 在a.b.0-hot-fix上修改代码,修改version为a.b.1,发布change log。
3. 将a.b.0-hot-fix合入relase,在release上打tag,其命名为a.b.1-r0。
4. 等待测试通过(可选)
5. 将a.b.0-hot-fix合入master,删除a.b.0-hot-fix，在master上打tag,其命名为a.b.1
6. 若在下一次版本迭代前仍然出现bug则重复此流程。

## package.json scripts

```bash
yarn start # 开发模式启动
yarn build # 编译
yarn test # 执行一次针对于变动文件的单元测试
yarn test:watch # 在监听模式下执行变动文件的单元测试
yarn test:full # 执行一次针对所有文件的单元测试
yarn test:report # 打开覆盖率报告
yarn lint # 执行eslint
yarn lint:fix # 执行eslint 并尝试修改
yarn check:coverage # 检查单元测试覆盖率
yarn version # 修改指定版本,输出change log,并打tag
yarn version --path #递增0.0.x,输出change log,并打tag
yarn version --minor #递增0.x.0,输出change log,并打tag
yarn version --major #递增x.0.0,输出change log,并打tag
```

## bash scripts

```bash
sh build.sh # 构建docker镜像,会生成3个docker image tag
```

## other scripts

```bash
git cz 提交changes
```
