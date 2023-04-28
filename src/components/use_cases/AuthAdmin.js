import AuthStore from '../store/AuthStore';

export const userLogin = (email, password) => {
    return new AuthStore().login(email, password);
}

export const userLogout = () => {
    return new AuthStore().logout();
};
