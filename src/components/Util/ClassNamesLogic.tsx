type classLogic = string | boolean;

export default function ClassNamesLogic(...classes: classLogic[]): string {
  return classes.filter(Boolean).join(' ');
}
