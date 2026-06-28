const MotoImage = ({ src, alt }) => src ? (
    <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
    />
) : null

export default MotoImage
