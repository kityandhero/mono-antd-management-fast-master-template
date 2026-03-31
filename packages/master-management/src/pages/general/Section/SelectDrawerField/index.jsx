import React from 'react';

import { buildFieldDescription, getValueByKey } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { fieldData } from '../Common/data';
import { PageListSelectDrawer } from '../PageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class SectionSelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const name = getValueByKey({
      data,
      key: fieldData.name.name,
      defaultValue: '',
    });

    return name || '';
  };

  openSelector = () => {
    PageListSelectDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '选择栏目',
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

export { SectionSelectDrawerField };
