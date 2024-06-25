import { defineConfig } from '@umijs/max';

import {
  buildConfig as buildConfigCore,
  checkDevelopment,
} from 'antd-management-fast-config';

import pk from '../package.json';

import { config as configDevelopment } from './config.development';
import { config as configProduction } from './config.production';
import routes from './router.config';

function buildConfig() {
  return buildConfigCore({
    packageJson: pk,
    config: {
      esbuildMinifyIIFE: true,
      // mfsu: false,
      mfsu: {
        exclude: [
          '@ant-design/graphs',
          '@ant-design/icons',
          '@ant-design/pro-components',
          '@cyntler/react-doc-viewer',
          '@emotion/css',
          '@formily/antd-v5',
          '@formily/core',
          '@formily/react',
          '@reduxjs/toolkit',
          '@tanem/react-nprogress',
          '@umijs/max',
          'antd',
          'antd-management-fast-common',
          'antd-management-fast-component',
          'antd-management-fast-design-playground',
          'antd-management-fast-design-react',
          'antd-management-fast-flow',
          'antd-management-fast-formily',
          'antd-management-fast-framework',
          'easy-soft-dva',
          'easy-soft-utility',
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'redux-saga',
          'react-to-print',
          'reactflow',
        ],
      },
      styles: [`body { margin: 0; }`],
      routes: routes,
      ...(checkDevelopment() ? configDevelopment : configProduction),
    },
  });
}

export default defineConfig(buildConfig());
