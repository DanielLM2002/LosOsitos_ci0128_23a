import { Input } from 'antd';
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const InputButton = (props) => {
  const {
    text,
    datacy,
    placeholderText,
    disabled,
    type,
    onChangeFunction,
    onPressEnterFunction,
  } = props;
  const [inputValue, setInputValue] = useState(placeholderText);

  const handleChange = (e) => {
    type ? onChangeFunction(type, e.target.value)
         : onChangeFunction();
    setInputValue(e.target.value);
  };

  return (
    <>
      {text ? (
        <div className='grid grid-cols-1 sm:my-3'>
        <div className='sm:col-span-2'>
          {text && (
            <label className="block text-xl font-semibold leading-6 text-gray-900">
              {text}
            </label>
          )}
          <div className='mt-2.5'>
            <Input.Password
              data-cy={datacy}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={inputValue}
              disabled={disabled}
              placeholder={placeholderText}
              size='large' 
              className='w-full'
              onChange={handleChange}
              onPressEnter={onPressEnterFunction}
            />
          </div>
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-1 my-1 mx-2">
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <Input.Password
                data-cy={datacy}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={disabled ? placeholderText : inputValue}
                placeholder={placeholderText}
                disabled={disabled}
                size='large'
                className='w-full'
                onChange={handleChange}
                onPressEnter={onPressEnterFunction}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InputButton;
