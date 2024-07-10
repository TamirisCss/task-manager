const Button = ({ children, variant = 'primary' }) => {
  const getVariantClass = () => {
    if (variant === 'primary') {
      return 'bg-[#00ADB5] text-white'
    }
    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181]'
    }
  }

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantClass()}`}
    >
      {children}
    </button>
  )
}

export default Button
