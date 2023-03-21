import { Audio } from 'react-loader-spinner';

export const Loader = () => (
  <Audio
    height="80"
    width="80"
    radius="9"
    color="#3f51b5"
    ariaLabel="loading"
    wrapperStyle={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    }}
  />
);
