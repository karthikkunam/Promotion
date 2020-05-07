import jwtDecode from 'jwt-decode';
import _ from 'lodash';

export const getUserDetails = token => {
  let decodedTokenValue = token && jwtDecode(token);
  if (decodedTokenValue && !_.isEmpty(decodedTokenValue)) {
    const {
      store: {
        storeId,
        timeZone,
        user: {
          userId,
          fullName,
          roles
        },
        features: {
          store: {
            isGRAutoApprove
          },
        },
      },
      app: {
        environment,
        version
      },
      address,
      deviceType,
      readOnly,
    } = decodedTokenValue;

    return {
      storeId,
      timeZone,
      address,
      userId,
      fullName,
      roles,
      deviceType,
      isGRAutoApprove,
      environment,
      version,
      readOnly,
    };
  } else {
    return null;
  }
};
