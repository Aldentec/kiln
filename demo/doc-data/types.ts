export interface PropDef {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  description: string;
  preview: React.FC;
  code: string;
  props: PropDef[];
  testing: string;
  usage: string;
}
