const CurrentTab = ({ currenTab, setCurrentTab }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium items-center justify-center text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <a
          onClick={() => setCurrentTab("login")}
          aria-current="page"
          className={`inline-block p-4 rounded-t-lg cursor-pointer ${
            currenTab === "login"
              ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
              : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          }`}
        >
          Login
        </a>
      </li>
      <li className="mr-2">
        <a
          onClick={() => setCurrentTab("register")}
          className={`inline-block p-4 rounded-t-lg cursor-pointer ${
            currenTab === "register"
              ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
              : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          }`}
        >
          Register
        </a>
      </li>
    </ul>
  );
};

export default CurrentTab;
