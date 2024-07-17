export abstract class HasherGenerate {
  abstract hash(plain: string): Promise<string>
}
