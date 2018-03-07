module Types
  ChamberType = GraphQL::EnumType.define do
    name 'Chamber'
    description 'A legislative chamber'

    value :LOWER, 'The lower (house) chamber', value: 0
    value :UPPER, 'The upper (senate) chamber', value: 1
  end
end
