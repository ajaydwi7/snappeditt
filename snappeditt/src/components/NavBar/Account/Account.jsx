import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { Link } from "react-router-dom";
import FreeTrialPanel from "../../FreeTrialPanel/FreeTrialPanel";

const Account = () => {
  const { auth, serviceStore, modal } = useGlobalContext();
  const cartTotal = serviceStore.state.cartQuantity;

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };


  return (
    <div className="account">
      <div className="cart">
        <Link to={"/cart"} className="contains-link-to-accounts">
          {auth.state.user == null ? (
            <span className="account-user text-primaryRed">Guest</span>
          ) : (
            <span className="account-user text-primaryRed">{auth.state.user.username}</span>
          )}
          <span className="account-details text-primaryBlack">
            <FaShoppingCart />
            <span className="items-in-cart">{cartTotal}</span>
          </span>
        </Link>
      </div>
      <div className="login">
        {auth.state.user == null ? (
          <button
            className="btn-rounded small-rounded border-2 border-solid hover:border-primaryRed
             hover:bg-white hover:text-primaryRed"
            onClick={() => modal.openModal(false)}
          >
            Login
          </button>
        ) : (
          <button className="btn-rounded small-rounded border-2 border-solid hover:border-primaryRed
             hover:bg-white hover:text-primaryRed" onClick={auth.logout}>
            Logout
          </button>
        )}
      </div>

      {/* Free Trial Button */}

      <div className="free-trial">
        <button
          onClick={togglePanel}
          className=" btn-rounded  small-rounded px-6 py-4 bg-primaryRed border-2 text-white rounded-full font-semibold  hover:border-primaryRed
         hover:bg-white hover:text-primaryRed transition duration-300"
        >
          Free Trial
        </button>
        <FreeTrialPanel isPanelOpen={isPanelOpen} togglePanel={togglePanel} />
      </div>
    </div >
  );
};

export default Account;
