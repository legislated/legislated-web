module OpenStates
  class ParseStepSequence
    # upper introduced
    # upper:committee introduced
    # upper:committee resolved
    # upper resolved
    # lower introduced
    # lower:committee introducexed
    # lower:committee resolved
    # lower resolved
    # upper introduced

    # upper introduced
    # upper:committee introduced
    # upper:committee resolved
    # upper resolved
    # lower introduced
    # lower:committee introduced
    # lower:committee resolved
    # lower resolved
    # upper introduced
    # upper:committee introduced
    # upper:committee resolved
    # upper resolved
    # governor introduced
    # governor resolved vetoed

    # upper resolved
    # upper:committee resolved
    # goal know which chambers are passed and which are open
    def call(steps)
      sequence = []

      # track the actors with an introduced action
      introduced_actors = Set.new

      # assume sorted by ascending date
      steps.reverse_each do |step|
        # if we encounter an actor we've already introduced, we hit a cycle
        if introduced_actors.include(step.actor)
          break
        end

        if step.action == Step::Actions::INTRODUCED
          introduced_actors.add(step.actor)
        end

        # add this step to the front of the sequence to preserve ascending order
        sequence.unshift(step)
      end

      sequence
    end
  end
end
