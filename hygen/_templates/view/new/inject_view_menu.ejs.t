---
inject: true
to: "<%= linked ? `src/components/common/Header.js` : null %>"
before: "</Tabs>"
skip_if: to={ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>}
---
        <Tab
          label='<%= h.changeCase.sentenceCase(name) %>'
          value='<%= route.substring(1) %>'
          component={NavLink}
          to={ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>}
          className={classes.navLink}
        />