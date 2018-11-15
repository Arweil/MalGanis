import React from 'react';
import ReactDOM from 'react-dom';
import '@/style/theme.less';
import appRouter from './routers/index.js'
import appStore from './stores/index.js'
import app from 'malganis';

app({
  appRouter,
  appStore: () => { return {} },
  el: '#root'
})
