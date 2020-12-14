import { configureStore } from './configureStore';

let _store;

export default _store || (_store = configureStore());
