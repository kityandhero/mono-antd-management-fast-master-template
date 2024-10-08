import React from 'react';

import { FieldExtra } from 'antd-management-fast-component';

import { FromNodeSelectModal } from '../FromNodeSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class FromNodeSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { label } = {
      label: '',
      ...data,
    };

    return label;
  };

  openSelector = () => {
    FromNodeSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, helper, labelWidth, externalData } = {
      label: '',
      helper: '',
      labelWidth: 100,
      externalData: {},
      ...this.props,
    };

    return (
      <FromNodeSelectModal
        label={label}
        helper={helper}
        labelWidth={labelWidth}
        externalData={externalData || {}}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { FromNodeSelectModalField };
