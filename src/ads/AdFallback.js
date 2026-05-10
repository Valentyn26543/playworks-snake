export function completed() {
  return {
    success: true,
    reason: 'completed',
  };
}

export function failed(reason = 'failed') {
  return {
    success: false,
    reason,
  };
}

export function timeout() {
  return {
    success: false,
    reason: 'timeout',
  };
}

export function unavailable() {
  return {
    success: false,
    reason: 'unavailable',
  };
}

export const AdFallback = {
  completed,
  failed,
  timeout,
  unavailable,
};

export default AdFallback;
