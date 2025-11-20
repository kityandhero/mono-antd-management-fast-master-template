import React from 'react';

import { FieldExtra } from 'antd-management-fast-component';

import SelectModal from '../SelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class SelectField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { name } = {
      name: '',
      ...data,
    };

    return name;
  };

  openSelector = () => {
    SelectModal.open();
  };

  renderSelectModal = () => {
    const { label, externalData } = {
      label: '选择应用',
      externalData: {},
      ...this.props,
    };

    return (
      <SelectModal
        title={label}
        externalData={externalData}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export default SelectField;
