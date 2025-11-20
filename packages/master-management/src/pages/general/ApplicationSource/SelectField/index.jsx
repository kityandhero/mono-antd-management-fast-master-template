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

  renderPresetSelector = () => {
    const { label } = {
      label: '',
      ...this.props,
    };

    return (
      <SelectModal title={label} afterSelectSuccess={this.afterSelectSuccess} />
    );
  };
}

export default SelectField;
