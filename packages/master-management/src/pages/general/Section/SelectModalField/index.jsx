import React from 'react';

import { buildFieldDescription, getValueByKey } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { fieldData } from '../Common/data';
import { PageListSelectModal } from '../PageListSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class SectionSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const name = getValueByKey({
      data,
      key: fieldData.name.name,
      defaultValue: '',
    });

    return name || '';
  };

  openSelector = () => {
    PageListSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '选择栏目',
      ...this.props,
    };

    return (
      <PageListSelectModal
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { SectionSelectModalField };
