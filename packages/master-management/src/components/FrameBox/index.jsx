import React, { PureComponent } from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

class FrameBox extends PureComponent {
  frameRef = React.createRef();

  constructor(properties) {
    super(properties);

    this.state = {
      frameHeight: '0px',
    };
  }
  render() {
    const { url } = {
      url: '',
      ...this.props,
    };

    if (checkStringIsNullOrWhiteSpace(url)) {
      showSimpleErrorMessage(
        'url in FrameBox properties disallow null or empty',
      );
    }

    console.log({ url });

    return (
      <iframe
        ref={this.frameRef}
        scrolling="yes"
        frameBorder="0"
        style={{
          width: '100%',
          height: '100%',
          // height: this.state.frameHeight,
          // overflow: 'visible',
        }}
        // onLoad={() => {
        //   //iframe高度不超过content的高度即可
        //   let h = document.documentElement.clientHeight - 20;

        //   this.setState({
        //     frameHeight: h + 'px',
        //   });
        // }}
        src={url}
      />
    );
  }
}

export { FrameBox };
