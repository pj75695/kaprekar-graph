def kaprekar_step(num): # Single step of algorithm
    higher = int("".join(sorted(num, reverse=True)))
    lower = int("".join(sorted(num)))
    return f"{higher - lower:05d}"

def kaprekar_loop(start): # Gets full journey of number (repeats for all n>10
    target = start
    journey = []
    
    for _ in range(10): # Gets 10 stops in journey
        target = kaprekar_step(target)
        journey.append(target)

    return journey

def kaprekar_full(orderings): # Implementation for all numbers of () digits
        return {comb: kaprekar_loop(comb) for comb in orderings}

