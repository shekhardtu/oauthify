import React from "react";
import AuthCheck from "src/components/AuthCheck/index.component";
import ModalPortal from "src/components/Modal/modal.component";

const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen, children }) => {
    return ModalPortal({
        isOpen: isLoginModalOpen,
        onClose: () => setIsLoginModalOpen(false),
        children: <div className="bg-white p-4">{children}</div>
    });
}




const BoardPage = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
    return <>
        <div className="flex flex-col items-center justify-center h-screen">
            <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} >
                <AuthCheck onClose={() => setIsLoginModalOpen(false)} />
            </LoginModal>
            <h1 className="text-4xl font-bold">BoardPage</h1>
            <button onClick={() => setIsLoginModalOpen(true)}>Open Login Modal</button>
        </div>
    </>
};


export default BoardPage;