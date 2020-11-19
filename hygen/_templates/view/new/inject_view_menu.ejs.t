---
inject: true
to: "<%= linked ? `src/components/common/Header.js` : null %>"
before: "Auto import links"
skip_if: to='/<%= route %>'
---
            <Tab
              label='<%= h.changeCase.sentenceCase(name) %>'
              value='<%= route.substring(1) %>'
              component={NavLink}
              to='<%= route %>'
              className={classes.navLink}
            />