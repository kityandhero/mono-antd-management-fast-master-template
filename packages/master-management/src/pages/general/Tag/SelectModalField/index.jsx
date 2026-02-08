import React from 'react';

import { buildFieldDescription, getValueByKey } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { fieldData } from '../Common/data';
import { PageListSelectModal } from '../PageListSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class TagSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const title = getValueByKey({
      data,
      key: fieldData.title.name,
      defaultValue: '',
    });

    return title || '';
  };

  openSelector = () => {
    PageListSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, externalData } = {
      label: '选择',
      ...this.props,
    };

    return (
      <PageListSelectModal
        title={buildFieldDescription(label, '选择')}
        width={1200}
        externalData={externalData}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { TagSelectModalField };
