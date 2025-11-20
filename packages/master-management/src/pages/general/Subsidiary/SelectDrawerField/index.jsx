import React from 'react';

import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListSelectDrawer } from '../PageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class SubsidiarySelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { fullName, shortName } = {
      shortName: '',
      fullName: '',
      ...data,
    };

    return shortName || fullName;
  };

  openSelector = () => {
    PageListSelectDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '',
      ...this.props,
    };

    return (
      <PageListSelectDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { SubsidiarySelectDrawerField };
