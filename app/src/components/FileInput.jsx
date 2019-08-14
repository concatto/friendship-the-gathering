import React from 'react';
import PropTypes from 'prop-types';
import RequestButton from './RequestButton';

function FileInput({ onRead, busy, ...rest }) {
  const inputRef = React.useRef(null);

  function handleChange() {
    const { files } = inputRef.current;

    if (onRead && files) {
      for (let i = 0; i < files.length; i += 1) {
        const formData = new FormData();
        // const reader = new FileReader();

        // reader.onload = (e) => {
        //   const { name, size } = files[i];
        //   // console.log(e);
        //   onRead({ name, size, data: e.target.result });
        //   // $('#blah').attr('src', e.target.result);
        // };

        // reader.readAsDataURL(files[i]);
        // console.log(files[i]);

        formData.append('record', files[i]);
        onRead(files[i], formData);
      }
    }
  }

  return (
    <>
      <input
        type="file"
        accept="*/*"
        onChange={() => handleChange()}
        style={{ display: 'none' }}
        onClick={(e) => { e.target.value = null; }}
        ref={inputRef}
      />

      <RequestButton
        color="primary"
        variant="outlined"
        size="large"
        busy={busy}
        onClick={() => inputRef.current.click()}
        {...rest}
      >
        Selecionar arquivo
      </RequestButton>
    </>
  );
}

FileInput.propTypes = {
  busy: PropTypes.any,
  onRead: PropTypes.any,
};

export default FileInput;
