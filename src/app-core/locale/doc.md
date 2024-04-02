# File structure:
```
.
|-- translations
|   |-- en
|   |   |-- common.json
|   |   |-- message.json
|   |   |-- validation.json
|   |   |-- component.json
|   |   |-- constants.json
|   |   |-- user.json
|   |   `-- [...other pages]
|   `-- [...others language]
|       |-- [....]
```
---
- common.json: use for common text in app. Ex: *Yes, No, OK, Agree....*
- message.json: message from server, toast message, error dialog, confirmation dialog. Ex: *The user ABC has been deleted success*
- validation.json: use for form validation message. Ex: *Email invalid*
- component.json: use for component own text
- constants.json: use for constant. Ex: *UserStatus, Role*
- user.json: each module should have a file for own text
---
# Key definition:

- Pattern:[fileName].[moduleName|componentName].[componentName].[content]
- Use uppercase letters
- Use _ to separate content
- Ex:

```json
  {
    "COMMON.OK": "Ok"
  }
```
```json
  {
    "MESSAGE.DELETE_USER_SUCCESS.OK": "User has been deleted success"
  }
```
```json
  {
    "VALIDATION.EMAIL_INVALID": "Email invalid"
  }
```
```json
  {
    "USER.LIST_USER.COLUMN.NAME": "Name"
  }
```

# Example
- Key define:
```json
  {
    "GREETINGS": "Hello, {{user.name}}!"
  }
```
- Use:
```javascript
  <Text>{t('GREETINGS', { user: { name: 'John' } })}</Text>
```
