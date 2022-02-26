import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';

export const reducers = combineReducers({ posts, auth });

//exported to main index.js