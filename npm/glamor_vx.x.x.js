// flow-typed signature: 102678215363dcb7b813c3158ac93132
// flow-typed version: <<STUB>>/glamor_v2.20.24/flow_v0.42.0
declare module 'glamor' {
  // rule types
  declare interface RuleProp {
    [attributeName: string]: ''
  }

  declare type RuleDefinition = {
    label?: string,
    [propertyName: string]: any
  };

  declare type EmptyRule = null | void | false;

  declare type Rule = RuleDefinition | RuleProp | EmptyRule;

  // functons
  declare function css (...rules: Array<Rule>): RuleProp;
  declare function insertGlobal (selector: string, style: RuleDefinition): void;

  // exports
  declare module.exports: {
    css: css,
    insertGlobal: insertGlobal,
    Rule: Rule
  }
}
