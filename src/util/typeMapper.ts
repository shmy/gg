import {RegExpMapper} from '../resolver/resolver';

export type Type2Define = { [key: string]: string };

export const getRegExpMapper = (type2define: Type2Define): RegExpMapper[] => {
  const regs: RegExpMapper[] = [];
  Object.keys(type2define).forEach(key => {
    regs.push({
      reg: new RegExp(key, 'i'),
      val: type2define[key],
    });
  });
  return regs;
}
