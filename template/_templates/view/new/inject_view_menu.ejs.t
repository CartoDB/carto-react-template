---
inject: true
to: src/components/common/Header.js
before: "Auto import links"
skip_if: to='/<%= route %>'
---
            <Tab
              label='<%= h.changeCase.sentenceCase(name) %>'
              value='<%= route %>'
              component={NavLink}
              to='/<%= route %>'
              className={classes.navLink}
            />