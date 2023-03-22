import { Audio } from 'react-loader-spinner';

export const Loader = () => (
  <Audio
    height="80"
    width="80"
    radius="9"
    color="rgb(177, 156, 217)"
    ariaLabel="loading"
    wrapperStyle={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '15px',
    }}
  />
);
