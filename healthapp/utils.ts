export const parseArguments = (args: string[], minLength: number, maxLength: number) => {
  if (args.length < minLength) throw new Error(`Not enough arguments, gave ${args.length}, min ${minLength}`);
  if (args.length > maxLength) throw new Error(`Too many arguments, gave ${args.length}, min ${maxLength}`);

  args.slice(2).forEach((a) => {
    if (isNaN(Number(a))) {
        throw new Error('All values must be numbers.')
    }
  })
}

export default { parseArguments }