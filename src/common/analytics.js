import analytics from '@react-native-firebase/analytics';

export async function trackScreenView(screen) {
  // Set & override the MainActivity screen name
  await analytics().setCurrentScreen(screen, screen);
}

export async function trackUserEvent(eventName, eventParams) {
  if (eventParams) {
    await analytics().logEvent(eventName, eventParams);
  }
  await analytics().logEvent(eventName);
}

export const events = {
  home: {
    details: 'home_go_details_btn',
  },
  buy: {
    increase: 'increase_qty_btn',
    decrease: 'decrease_qty_btn',
    buy: 'buy_btn',
  },
  settings: {
    details: 'settings_go_details_btn',
    logout: 'logout_btn',
  },
  crash: {
    refErr: 'reference_error_btn',
    typeErr: 'type_error_btn',
    infiniteErr: 'infinite_loop_error_button',
    callStackErr: 'call_stack_error_button',
    catchException: 'catch_exception_button',
  },
  login: {
    login: 'login_btn',
  },
};
