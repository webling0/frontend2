import "../public/fonts/fonts.css";
import "../public/fonts/font-icons.css";
import "../public/css/bootstrap.min.css";
import "../public/css/bootstrap-select.min.css";
import "../public/css/swiper-bundle.min.css";
import "../public/css/animate.css";
import "../public/scss/main.scss";
import "photoswipe/style.css";
import "react-range-slider-input/dist/style.css";
// import "../public/css/image-compare-viewer.min.css";
import Context from "@/context/Context";
import RouteChangeHandler from "@/components/common/RouteChangeHandler";
import CartModal from "@/components/modals/CartModal";
import QuickView from "@/components/modals/QuickView";
import QuickAdd from "@/components/modals/QuickAdd";
import MobileMenu from "@/components/modals/MobileMenu";
import NewsLetterModal from "@/components/modals/NewsLetterModal";
import SearchModal from "@/components/modals/SearchModal";
import SizeGuide from "@/components/modals/SizeGuide";
import DemoModal from "@/components/modals/DemoModal";
import Categories from "@/components/modals/Categories";
import LoginModal from "@/components/modals/LoginModal";
import DeliveryReturnModal from "@/components/modals/DeliveryReturnModal";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import ShareModal from "@/components/modals/ShareModal";
import WowController from "@/components/common/WowController";
import ScrollController from "@/components/common/ScrollController";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="preload-wrapper popup-loader">
        <Context>
          <div id="wrapper">{children}</div>
          <RouteChangeHandler />
          <ScrollController />
          <WowController />
          <CartModal />
          <QuickView />
          <QuickAdd />
          <MobileMenu />

          <NewsLetterModal />
          <SearchModal />
          <SizeGuide />
          <DemoModal />
          <Categories />
          <LoginModal />
          <DeliveryReturnModal />
          <AskQuestionModal />
          <ShareModal />
        </Context>
      </body>
    </html>
  );
}
