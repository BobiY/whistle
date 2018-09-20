import warning from "warning";

const createTransitionManager = () => {
  let prompt = null;

  const setPrompt = nextPrompt => {
    warning(prompt == null, "A history supports only one prompt at a time"); // 历史记录一次只支持一个提示

    prompt = nextPrompt;

    return () => {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  const confirmTransitionTo = (
    location,
    action,
    getUserConfirmation,
    callback
  ) => {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {  // 在未做设置时， prompt = null； 
      const result =
        typeof prompt === "function" ? prompt(location, action) : prompt;  // 明显，这个玩意可以是个 function 接收的参数是 传递进来的 localtion 和 action  返回值就是一个字符串

      if (typeof result === "string") {
        if (typeof getUserConfirmation === "function") {
          getUserConfirmation(result, callback);
        } else {
          warning(
            false,
            "A history needs a getUserConfirmation function in order to use a prompt message"
          );

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);  // 这时会直接执行 callback（true）
    }
  };

  let listeners = [];

  const appendListener = fn => {
    let isActive = true;

    const listener = (...args) => {
      if (isActive) fn(...args);
    };

    listeners.push(listener);

    return () => {
      isActive = false;
      listeners = listeners.filter(item => item !== listener);
    };
  };

  const notifyListeners = (...args) => {  // 执行所有注册监听的函数
    listeners.forEach(listener => listener(...args));
  };

  return {
    setPrompt,
    confirmTransitionTo,
    appendListener,
    notifyListeners
  };
};

export default createTransitionManager;