class NestedAttributesForStrategy
  def association(runner)
    runner.run(:build)
  end

  def result(evaluation)
    extract_attributes(evaluation.object, evaluation.hash)
  end

  def extract_attributes(model, hash, parent = nil)
    return nil unless model

    # todo, need to be able to get the correct factory hash for associations
    attrs = hash || model.attributes.symbolize_keys

    association_keys = model.class.reflections.keys
      .map(&:to_sym)
      .select { |key| attrs.key? key }
      .map { |key| model.association(key).reader }

    association_attrs = association_keys.map do |key|
      association = model.association(key).reader
      should_extract = association && association != parent
      should_extract ? [key, extract_variant_attributes(association, model)] : nil
    end

    attrs.merge(association_attrs.compact.to_h)
  end

  def extract_variant_attributes(model_or_models, parent)
    return nil unless model_or_models

    if model_or_models.is_a? Enumerable
      model_or_models.map { |model| extract_attributes(model, nil, parent) }
    elsif model_or_models.is_a? ApplicationRecord
      extract_attributes(model_or_models, nil, parent)
    else
      raise "Can't generate attributes for association: #{model_or_models}"
    end
  end
end

FactoryGirl.register_strategy(:attributes_for, NestedAttributesForStrategy)
