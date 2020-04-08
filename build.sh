NAME=`cat package.json | grep name| head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]'`
VERSION=`cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]'`
GIT_HASH=`git rev-parse --short HEAD`
yarn build
docker build . -t "$NAME":latest -t "$NAME":"$GIT_HASH" -t "$NAME":"$VERSION"
rm -frd ./build