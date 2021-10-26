#/bin/bash
set_template()
{
  echo "Setup $1 ($2)"
  if [ $2 = js ]; then
    cp -R hygen/_templates/ "$1"/template/_templates
  else
    cp -R hygen/_templates-ts/ "$1"/template/_templates
  fi

  cd "$1"/template
  ln -sf package.dev.json package.json
  yarn 
  # yarn link-carto-react
  cd -
}


# simple js
set_template template-base-2 js
set_template template-sample-app-2 js
set_template template-base-3 js
set_template template-sample-app-3 js

# typescript
set_template template-base-3-typescript ts


