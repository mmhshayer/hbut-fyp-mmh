# hbut-fyp-mmh

## Add package to backend
    template:   ```nx g resource app/...```
    example :   ```nx g resource app/company```

    select  :
                ```
                @nestjs/schematics:resource
                @nrwl/nest:resource            <-
                ```
        

# TODO
    [] Attach logger
        [] error
        [] request
        [] response
    [] Save Logs to Database
    [] Enable these close to completion
        [] compresion
        [] caching
        [] ?versioning
        [] Cross-site request forgery
        [] Rate Limiting
        [] Healthchecks
    [] Known Issues
        [X] Trim whitespaces in input box - (trim-value.util.ts)

## `git update-index --no-assume-unchanged ./thunder-tests/*`
## `git update-index --assume-unchanged ./thunder-tests/*`