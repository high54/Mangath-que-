
import { services } from 'zetapush-js';


export class UsersProvider extends services.Macro {

  IsLoginAvailable(login) {
    return this.$publish('IsLoginAvailable', { login });
  }
  InsertUser(login, password, email, pseudo) {
    return this.$publish('InsertUser', { login, password, email, pseudo });
  }
  UpdateUser(login, pseudo) {
    return this.$publish('UpdateUser', { login, pseudo });
  }
  ResetPasswordUser(login) {
    return this.$publish('ResetPasswordUser', { login });
  }
  ChangePasswordUser(token, password) {
    return this.$publish('ChangePasswordUser', { token, password })
  }
  GetUserByLogin(login) {
    return this.$publish('GetUserByLogin', { login });
  }
  GetUserByKey(userKey) {
    return this.$publish('GetUserByKey', { userKey });
  }
  CountDetailsUser(userKey)
  {
    return this.$publish('CountDetailsUser', { userKey });
  }
}
