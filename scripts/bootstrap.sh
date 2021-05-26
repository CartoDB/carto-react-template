#/bin/bash
set_template()
{
  echo "Setup $1"
  cp -R hygen/_templates/ "$1"/template/_templates
  cd "$1"/template
  ln -sf package.dev.json package.json
  yarn 
  # yarn link-carto-react
  cd -
}

set_template template-sample-app
set_template template-skeleton
set_template template-skeleton-cn

