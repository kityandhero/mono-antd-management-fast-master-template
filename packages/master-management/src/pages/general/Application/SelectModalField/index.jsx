import React from 'react';

import { FieldExtra } from 'antd-management-fast-component';

import { ApplicationSelectModal } from '../SelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class ApplicationSelectModalField extends BaseSelectFieldExtra {
  getProperties = () => {
    return {
      label: '选择应用',
      ...this.props,
    };
  };

  selectValueText = (data) => {
    const { name } = {
      name: '',
      ...data,
    };

    return name;
  };

  openSelector = () => {
    ApplicationSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, externalData } = this.getProperties();

    return (
      <ApplicationSelectModal
        label={label}
        labelWidth={80}
        externalData={externalData}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { ApplicationSelectModalField };
