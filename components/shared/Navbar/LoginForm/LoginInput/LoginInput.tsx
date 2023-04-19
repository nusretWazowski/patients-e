import { FormControl, OutlinedInput } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { FC, FormEvent, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { LoginType } from '../LoginButton/LoginButton';

import classes from './LoginInput.module.css';

interface LoginInputProps {
  show: boolean;
  loginType: LoginType | undefined;
  onExited: () => void;
  onLogin: (value: object) => void;
}

const LoginInput: FC<LoginInputProps> = (props) => {
  const [socialNumber, setSocialNumber] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');

  const [registerPhase, setRegisterPhase] = useState<1 | 2 | 3>(1);

  const input = (
    <>
      {registerPhase === 1 && (
        <OutlinedInput
          className={classes.input}
          value={socialNumber}
          placeholder="Social Number"
          onChange={(event) => setSocialNumber(event.target.value)}
        />
      )}
      {registerPhase === 2 && (
        <OutlinedInput
          className={classes.input}
          value={companyName}
          placeholder="Company Name"
          onChange={(event) => setCompanyName(event.target.value)}
        />
      )}
      {registerPhase === 3 && (
        <OutlinedInput
          className={classes.input}
          value={fullName}
          placeholder="Full Name"
          onChange={(event) => setFullName(event.target.value)}
        />
      )}
    </>
  );

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();

    if (props.loginType === 'REGISTER') {
      if (registerPhase === 3) {
        const registerData = {
          name: fullName,
          socialNumber,
          companyName
        };

        return props.onLogin(registerData);
      }
      setRegisterPhase((prevPhase) => (prevPhase + 1) as 1 | 2 | 3);
    }

    if (props.loginType === 'LOGIN') {
      if (socialNumber.trim().length === 0) {
        return;
      }
      props.onLogin({ socialNumber });
    }
  };
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="login-input"
      unmountOnExit
      mountOnEnter
      onExited={props.onExited}
    >
      <form onSubmit={loginHandler}>
        <FormControl>
          {input}
          {(socialNumber.trim().length > 0 ||
            fullName.trim().length > 0 ||
            companyName.trim().length > 0) && (
            <button className={classes.arrow} type="submit">
              <ArrowRight />
            </button>
          )}
        </FormControl>
      </form>
    </CSSTransition>
  );
};

export default LoginInput;