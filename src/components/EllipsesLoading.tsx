function EllipseLoader() {
    return (
        //ellipses loading animation
        <div className="flex h-screen items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 bg-[#4a4a4a] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-2.5 bg-[#4a4a4a] rounded-full animate-bounce"></div>
        </div>
    );
}

export default EllipseLoader;
