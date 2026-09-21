# Question list: batch 002

Questions 501–1,000: Python, Java, C# language features, databases, and Azure.
Question prompts only; answers are not included. These prompts are individually
written and checked against the other files in this restarted list.

## Python

501. Why can a Python function remember items appended to a default list between calls?
502. How would you distinguish Python object identity from value equality when testing a sentinel?
503. What does Python floor division return for negative operands, and how does the remainder relate?
504. Why do functions created inside a Python loop sometimes all use its final variable value?
505. When should a Python function declare nonlocal instead of global?
506. How can a Python variable assignment cause UnboundLocalError earlier in the same function?
507. What state remains mutable inside a Python tuple containing a dictionary?
508. Why can repeating a nested Python list create rows that change together?
509. When does a Python shallow copy fail to isolate nested edits?
510. How would you implement copying for a Python object that owns an open socket?
511. Why must a Python object's equality and hash implementations obey a shared contract?
512. What can happen if a Python set member changes a field used in its hash?
513. How do Python truthiness rules affect a fallback that must preserve zero?
514. Why can Python Boolean operators return values other than True or False?
515. What is evaluated once in a chained Python comparison containing a function call?
516. How would you sort Python records by two fields while preserving ties predictably?
517. Why does Python list.sort return None, and what error can chaining it introduce?
518. How do Python slicing and direct indexing differ when a boundary exceeds the sequence length?
519. When is a deque preferable to a Python list for a queue?
520. What data-loss policy is implied by appending to a full bounded Python deque?
521. How would you distinguish a missing Python dictionary key from a stored None?
522. Why can dict.fromkeys with a mutable default share state across keys?
523. What changes remain visible through Python dictionary keys and items views?
524. Why can accessing a missing defaultdict key behave differently from calling get?
525. How does a Python Counter represent multiplicity differently from a set?
526. When would a frozenset be a suitable key for an unordered relationship?
527. What happens when a Python dictionary comprehension produces the same key repeatedly?
528. How can Python argument unpacking detect an unexpected number of returned values?
529. What does a starred target receive when Python unpacks an iterable?
530. Why would a public Python function use positional-only parameters?
531. How can keyword-only Python options prevent ambiguous Boolean arguments?
532. What happens to Python argument expressions when the eventual function call has invalid arguments?
533. How does functools.partial change a callable without immediately executing it?
534. What metadata can be lost when a Python decorator omits functools.wraps?
535. How does Python decorator ordering affect which wrapper observes an exception?
536. Why might a synchronous decorator be inappropriate for an asynchronous Python function?
537. How does Python classmethod support alternative constructors in subclasses?
538. When should Python object creation customize __new__ instead of __init__?
539. What distinguishes a Python descriptor from an ordinary class attribute?
540. How can a data descriptor affect lookup when an instance dictionary has the same attribute name?
541. What distinguishes __getattr__ from __getattribute__ in Python attribute access?
542. How could a careless __getattribute__ implementation recurse indefinitely?
543. How does Python resolve a diamond inheritance hierarchy using its method resolution order?
544. Why does cooperative multiple inheritance require compatible super calls across participating classes?
545. What limitations can __slots__ introduce for dynamic Python attributes and weak references?
546. How would you choose useful Python __repr__ output without exposing confidential state?
547. When should a Python special method return NotImplemented rather than raise an exception?
548. Why is Python __del__ a poor sole mechanism for timely connection cleanup?
549. How does a context manager decide whether an exception from its body is suppressed?
550. How can ExitStack release a variable number of partially acquired Python resources?
551. What happens if a generator-based Python context manager yields twice?
552. When does the body of a Python generator actually begin running?
553. How does checking membership in a generator affect subsequent Python iteration?
554. What must callers do if they need to traverse a consumed Python generator again?
555. How does yield from propagate generator protocol operations beyond ordinary value iteration?
556. Why can itertools.groupby produce multiple groups for the same key?
557. What happens to an itertools.groupby group iterator after the outer iterator advances?
558. How can itertools.tee accumulate memory when its consumers progress at different speeds?
559. How would you detect unequal input lengths when zipping Python records that must align?
560. Why is materializing an unbounded Python iterator into a list unsafe?
561. How do Python str and bytes differ at a network protocol boundary?
562. Why is the length of a Python string not always its displayed character count?
563. When does Unicode normalization matter before comparing Python identifiers?
564. Why does Python strip with a string argument not remove an exact substring?
565. What distinguishes Python split with no argument from splitting on a literal space?
566. When is casefold more appropriate than lower for Python caseless matching?
567. How would you decode a text file while reporting invalid byte positions instead of silently dropping bytes?
568. Why should Python CSV processing handle quoting rather than split each line on commas?
569. How do Python file modes w, a, and x express different overwrite policies?
570. How can a Python program replace a configuration file without exposing partially written contents?
571. Why is checking path existence before opening a Python file subject to a race?
572. What does flush guarantee compared with requesting durable filesystem synchronization?
573. Why can JSON round trips change Python dictionary key types?
574. Why must untrusted Python pickle data be treated as executable rather than ordinary records?
575. How would you serialize timezone-aware Python datetimes with an explicit interoperable contract?
576. Why can JSON encoding of a Python object's __dict__ leak implementation details?
577. What information does Python exception chaining preserve when translating a low-level failure?
578. How can returning from a Python finally block hide an earlier error?
579. Why are Python assert statements unsuitable for required input validation?
580. Which shutdown signals can an overly broad Python BaseException handler accidentally swallow?
581. How would you choose a tolerance when comparing Python floating-point results near zero?
582. Why can constructing Decimal from a float retain an unwanted approximation?
583. How can a local decimal context isolate rounding settings for one calculation?
584. Why does Python integer arithmetic cease to have constant cost for extremely large values?
585. How can lru_cache retain an instance through a cached method's arguments?
586. What happens when callers mutate a list returned by a cached Python function?
587. Why does caching a function that reads a file require an invalidation policy?
588. How can a Python module named after a standard-library module break imports?
589. What does Python sys.modules imply about repeated import-time side effects?
590. Why can from module import value stop reflecting later rebinding within that module?
591. How would you prevent Python subprocess deadlock when stdout and stderr are both piped?
592. Why should a Python process-pool worker generally be importable at module scope?
593. How can serialization overhead erase the speedup from Python multiprocessing?
594. Why must condition-variable waiters recheck their shared predicate after waking?
595. How can incorrect Queue.task_done accounting prevent a Python join from completing?
596. How would you prevent nested jobs from deadlocking a bounded Python worker pool?
597. How do TypedDict annotations differ from runtime validation of incoming JSON?
598. Why does typing.cast not convert an object into the requested Python type?
599. How can a Python Protocol describe structural compatibility without a shared base class?
600. Where should a Python test patch a dependency imported into the module under test?

## Java

601. Why can a Java method mutate an argument object but not rebind its caller's variable?
602. What makes a Java local variable effectively final for lambda capture?
603. How does Java overload resolution differ from runtime method overriding?
604. Why can passing null to overloaded Java methods be ambiguous?
605. How does Java method hiding affect a static call through a superclass reference?
606. What can an overridden method observe when a Java superclass constructor invokes it?
607. How can a Java constructor publish an incompletely initialized instance?
608. What does ExceptionInInitializerError reveal about Java class initialization?
609. How do static initialization order and circular class dependencies interact in Java?
610. How would you design a Java builder that rejects invalid field combinations before construction?
611. Why can assigning an int multiplication result to long still preserve an overflowed value?
612. When should Java code use Math.addExact rather than ordinary addition?
613. How do signed and unsigned right shifts differ for a negative Java integer?
614. When do Java floorDiv and floorMod better match a wrapping-index requirement than division and remainder?
615. How can nullable Java wrapper values trigger unexpected unboxing failures?
616. Why must Java wrapper identity not be used as a numeric equality contract?
617. How do BigDecimal equality and ordering treat values with different scales?
618. Why can exact BigDecimal division fail for a nonterminating decimal result?
619. How would you select BigDecimal precision and rounding for repeated allocation calculations?
620. Why should a decimal string be preferred when creating an exact Java decimal amount?
621. How does Java String.length relate to UTF-16 code units and supplementary characters?
622. How would you iterate Java text by code point without splitting surrogate pairs?
623. What differs between literal replacement and regex replacement in Java strings?
624. Why can Java String.split discard trailing empty fields?
625. How would you treat an arbitrary user delimiter literally in a Java regular expression?
626. When does Locale.ROOT matter for canonicalizing Java protocol identifiers?
627. What memory tradeoffs would you measure before interning many Java strings?
628. Why should Java byte-to-text conversion use an explicit charset for persisted data?
629. How could repeated Java string concatenation in a loop affect allocation and runtime cost?
630. Why is a shared StringBuilder inappropriate for unsynchronized concurrent writes?
631. Why can Arrays.asList allow replacement but reject adding another element?
632. How does an unmodifiable Java list view differ from an independent snapshot?
633. What mutability remains in a List.copyOf result containing mutable objects?
634. How can Java List<Integer>.remove select an index when value removal was intended?
635. Why can mutating a Java map key make an existing entry difficult to retrieve?
636. When can a TreeSet collapse objects that equals considers different?
637. Why does iterating a Java PriorityQueue not produce sorted priority order?
638. What workload makes CopyOnWriteArrayList unsuitable despite safe snapshot iteration?
639. How does retaining a Java subList affect ownership of its backing list?
640. Why does ConcurrentHashMap reject null keys and values?
641. How does a Java EnumMap differ from a general-purpose map for enum keys?
642. When is an IdentityHashMap appropriate despite ignoring ordinary value equality?
643. Why should Java WeakHashMap not be treated as a predictable expiration cache?
644. How would you preserve insertion order while building a deduplicated Java collection?
645. Why is List<Integer> not a subtype of List<Number> in Java?
646. What can Java safely insert into a List<? super Integer> parameter?
647. Why does List<? extends Number> restrict adding arbitrary Number instances?
648. How do Java raw types allow heap pollution to surface far from its origin?
649. Why cannot a generic Java method ordinarily allocate new T[n]?
650. How can array covariance lead to a Java ArrayStoreException after a valid assignment?
651. What constraints make a generic Java varargs method safe to annotate with SafeVarargs?
652. How does a Java bounded type parameter expose operations unavailable on an unconstrained type?
653. In what order does Java try-with-resources close several acquired resources?
654. How are resource-closing failures recorded when a Java try body already failed?
655. Why can a Java finally return override an exception or pending return value?
656. What should a Java handler do if it cannot propagate InterruptedException directly?
657. Why should Java business logic rarely catch Throwable as a recovery strategy?
658. How can repeated logging and rethrowing obscure one Java failure across service layers?
659. When should a Java exception carry a stable error code in addition to a message?
660. How would you preserve a low-level cause when translating a Java persistence exception?
661. Why can a Java stream pipeline remain unevaluated until a terminal operation?
662. How can stream optimization make intermediate side effects an unreliable business mechanism?
663. Why does mutating a shared list from a parallel Java forEach introduce races?
664. How do findFirst and findAny express different Java stream ordering requirements?
665. Why must the combining operation of a parallel Java reduction be associative?
666. How does Collectors.toMap handle duplicate keys without an explicit merge policy?
667. When can Optional.orElse evaluate an expensive fallback unnecessarily?
668. Why does a stream returned by Files.lines require explicit resource cleanup?
669. How would you collect Java stream elements into immutable grouped results?
670. What happens when code tries to reuse an already consumed Java stream?
671. Why does a volatile Java counter still lose updates when incremented concurrently?
672. When is LongAdder unsuitable for assigning unique sequential identifiers?
673. What history can a compare-and-set operation miss in the ABA problem?
674. Why must Java Object.wait be called while owning the associated monitor?
675. How does Thread.sleep differ from wait in releasing a Java monitor?
676. What lock-ordering discipline prevents circular waits among several Java locks?
677. How do CountDownLatch and CyclicBarrier differ in reuse and participant coordination?
678. Why does ExecutorService.shutdown not imply that all submitted work has finished?
679. How would you choose a rejection policy for a saturated bounded Java executor?
680. Why can a non-Async CompletableFuture continuation block the thread completing its predecessor?
681. How does thenCompose prevent nested futures when chaining asynchronous Java operations?
682. How do handle and exceptionally differ in a CompletableFuture recovery chain?
683. Why does cancelling a CompletableFuture not necessarily interrupt its underlying producer?
684. How would you propagate request context through a Java executor without leaking it between tasks?
685. What guarantees must hold before an immutable Java object is safely shared across threads?
686. Why can a thread-safe Java collection still require synchronization for a compound operation?
687. How would you avoid holding a Java lock while invoking an unknown user callback?
688. What can Java ThreadLocal values retain when application threads are pooled?
689. Why can InputStream.read return fewer bytes than requested without reaching end-of-file?
690. Why is InputStream.available unsuitable as a general total-length estimate?
691. How would you distinguish Java writer buffering from actual durable storage completion?
692. Why must a pooled JDBC connection still be closed by application code?
693. How should a Java file-processing job handle malformed input halfway through a stream?
694. How does Instant differ from LocalDateTime for recording cross-region events?
695. When does adding a calendar Period differ from adding a fixed Duration in Java?
696. How does injecting java.time.Clock improve expiration-boundary tests?
697. Why is DateTimeFormatter easier to share than a mutable date formatter?
698. How would a Java test compare nested arrays by contents rather than object identity?
699. Why can a Java record require defensive copies of collection components?
700. How would you evolve a sealed Java hierarchy while ensuring consumers handle new permitted types?

## C# language and runtime

701. What distinguishes assignment of a C# struct from assignment of a class reference?
702. How can boxing a C# value type create an independent copy of its current value?
703. Why can modifying a boxed mutable struct fail to change the original variable?
704. What type and null checks occur when unboxing an object to a C# value type?
705. How do ref, out, and in express different C# parameter contracts?
706. When can passing a large struct with in introduce a defensive copy?
707. What lifetime restrictions apply to a C# method returning a reference to storage?
708. How does ref readonly differ from returning a value copy to a C# caller?
709. Why can a ref struct not be stored wherever an ordinary struct can?
710. How would you determine whether stackalloc is appropriate for a temporary parsing buffer?
711. What risks arise from allocating stack memory based directly on untrusted input size?
712. How can a C# iterator's deferred execution change when argument validation occurs?
713. Why can enumerating the same LINQ pipeline twice repeat external work?
714. What is the ownership difference between IEnumerable<T> and a materialized read-only collection?
715. How does capturing a mutable variable affect a deferred C# LINQ predicate?
716. Why can an IQueryable expression behave differently from an equivalent compiled delegate?
717. What distinguishes Expression<Func<T, bool>> from Func<T, bool> for query providers?
718. How would you combine expression trees without introducing an untranslatable invocation node?
719. When does using AsEnumerable move subsequent LINQ operations outside the database provider?
720. What happens when a C# sequence operation expects one element but receives none or several?
721. How would you choose between Single, First, and their default-returning variants from a business invariant?
722. What ambiguity can FirstOrDefault introduce when the default value is a legitimate element?
723. How do GroupBy and ToLookup differ in execution timing and repeated access?
724. Why can a LINQ join's equality comparer change which records are matched?
725. How would you deduplicate C# objects by selected fields without changing their global equality implementation?
726. What changes when a C# lambda captures state instead of being declared static?
727. Why can captured local variables outlive the method that created a delegate?
728. How would you compare two delegate instances to remove an event subscription reliably?
729. What distinguishes a multicast delegate's return value from its individual invocation results?
730. What happens to later handlers when one synchronous C# event subscriber throws?
731. How would you expose an event without allowing consumers to replace its entire subscriber list?
732. What makes an async void method's error handling different from an async Task method?
733. When is an async void signature unavoidable, and where should its exceptions be handled?
734. How would you distinguish a faulted Task from a synchronously thrown exception at a method call?
735. What does ConfigureAwait(false) change about continuation scheduling rather than operation execution?
736. Why does wrapping naturally asynchronous I/O in Task.Run usually not improve its scalability?
737. How can Task.Factory.StartNew with an async lambda produce an unexpected nested task?
738. What options should be considered when a TaskCompletionSource completes user continuations?
739. How would you prevent two racing callbacks from completing a TaskCompletionSource twice?
740. What distinguishes Task.Delay from blocking a thread with Thread.Sleep?
741. How does a cancellation token communicate a request rather than forcibly terminate arbitrary code?
742. When can a cancellation callback run synchronously during token registration?
743. Why should cancellation callbacks avoid blocking on locks held by the cancelling thread?
744. How would you test cancellation before, during, and after an operation's irreversible step?
745. What changes when a C# method is marked async even though it has no await expression?
746. How can exception filters preserve useful stack context while selecting a handler?
747. What is lost when C# code uses throw ex instead of a bare throw inside a handler?
748. How would you preserve an exception's dispatch information when rethrowing on another execution path?
749. Why should a C# custom exception's serialized state avoid depending on live service objects?
750. How do checked and unchecked contexts affect arithmetic and conversions in C#?
751. What does a nullable value type represent that a nullable reference annotation does not enforce at runtime?
752. How can the null-forgiving operator silence a warning without making an access safe?
753. What flow-analysis limitations appear when null checks are hidden inside custom helper methods?
754. How would nullable attributes express the relationship between a Try method's return value and output parameter?
755. What distinguishes a required property from runtime validation that its value is meaningful?
756. How can an init accessor support construction-time assignment while exposing mutable nested objects?
757. What does a with expression copy when used on a C# record?
758. How does record inheritance affect equality between related runtime types?
759. Why might a value object use an explicit constructor instead of a positional record declaration?
760. How would pattern matching distinguish null, an empty collection, and a collection with one item?
761. What ordering considerations matter when C# switch-expression patterns overlap?
762. How can a property pattern invoke behavior rather than merely inspect stored fields?
763. Why should exhaustive handling of enum values account for values not declared as named members?
764. How do flags enums represent combinations, and what makes a bit assignment incompatible?
765. What happens when a C# enum value is converted to or from an underlying integer outside expected names?
766. How would you expose extensible public constants without embedding stale values in consuming assemblies?
767. What differs between const and static readonly for binary compatibility across assembly updates?
768. How does a C# static constructor influence initialization timing and failure behavior?
769. When can Lazy<T> cache an exception, and how should callers decide whether that is desirable?
770. Why can a static generic class hold different state for different constructed type arguments?
771. How do generic constraints express capabilities available inside a C# generic method?
772. What does the unmanaged constraint permit that the struct constraint alone does not?
773. How does generic covariance allow producers to be substituted without permitting unsafe writes?
774. When is contravariance useful for a C# comparer or callback consumer?
775. Why are mutable generic collections generally invariant in their element type?
776. How can extension-method resolution differ from normal instance-method dispatch?
777. What happens when an added instance method has the same apparent signature as a previously used extension method?
778. How would explicit interface implementation expose different behaviors for two conflicting interface contracts?
779. What versioning considerations arise when adding members to a public interface?
780. How does a default interface implementation affect existing implementing classes?
781. What distinctions matter between method overriding, overloading, and hiding in C#?
782. How can optional parameter defaults be bound differently from values looked up at runtime?
783. Why can changing a public optional argument's default leave old callers using the previous value?
784. What restrictions make user-defined implicit conversions risky in a public domain model?
785. How do operator overloads interact with equality expectations in generic collection code?
786. Why should string comparisons for protocol tokens use an explicit comparison mode?
787. How can culture changes alter parsing when C# code uses default numeric formats?
788. How would TryParse-based validation preserve the distinction between invalid input and a valid zero?
789. What precision can be lost when converting decimal to double and back?
790. How does DateTime.Kind affect conversion without storing a full timezone rule set?
791. When is DateTimeOffset insufficient to represent a recurring local-time appointment?
792. What does TimeProvider make testable in code that otherwise reads time directly?
793. How would you define equality for a struct containing floating-point measurements with tolerance?
794. Why can a tolerance-based equality rule be unsuitable for hashing without careful equivalence semantics?
795. How do finalization and deterministic disposal cooperate when a .NET type owns an unmanaged handle?
796. What does SafeHandle protect against that an unmanaged pointer field alone does not?
797. How can pinned managed memory interfere with garbage-collector movement and heap organization?
798. When would native interop require explicit string encoding and ownership rules?
799. How would you diagnose a native callback invoked after its managed delegate became unreachable?
800. What deployment tests reveal differences between running a .NET application from source and a published artifact?

## Database querying and modeling

801. How would SQL identify customers whose first purchase occurred within a specified reporting month?
802. How would you find the latest non-cancelled order for each customer without losing customers who have none?
803. How would you calculate consecutive daily-login streaks from a table containing duplicate login events?
804. How would SQL distinguish a customer's first subscription from a reactivation after a gap?
805. How would you find overlapping reservation intervals while treating an end time as exclusive?
806. How would you merge overlapping date ranges into minimal continuous intervals?
807. How would a query identify missing sequence numbers without assuming the sequence starts at one?
808. How would you pair entry and exit events when some exits are missing or duplicated?
809. How would you calculate session boundaries from event timestamps separated by an inactivity threshold?
810. How would SQL allocate each payment across invoices in chronological order?
811. How would you find entities that changed status more than three times within an hour?
812. How would you calculate a moving average that includes days with no transactions?
813. How would you compare each reading with the previous valid reading while ignoring invalid observations?
814. How would you select the median value within each group, including groups with even counts?
815. How would you find the second distinct highest amount without confusing it with the second row?
816. How would you calculate retention cohorts when customers can move between plans?
817. How would a query detect duplicate business events whose payload timestamps differ slightly?
818. How would you reconcile two tables while reporting records present only on either side?
819. How would you compare nullable columns during reconciliation without treating every NULL comparison as false?
820. How would you pivot known categories while preserving rows that have no observations in one category?
821. How would you turn repeated attribute columns into rows while preserving their original attribute names?
822. How would SQL locate hierarchy leaves without assuming every parent has only one child?
823. How would you calculate the full ancestry path for each hierarchy node?
824. How would you model a node with several parents when a simple adjacency list is insufficient?
825. How would you find graph nodes reachable within a maximum number of edges?
826. How would you count unique people across overlapping membership groups without double counting?
827. How would you calculate percentages when the denominator must include filtered-out categories?
828. How would you preserve the distinction between a zero aggregate and no matching input rows?
829. How would you select one representative row per group when all ordering values can tie?
830. How would you implement relational division to find users possessing every required qualification?
831. When does UNION remove rows that UNION ALL would preserve, and what work does that require?
832. How can a correlated subquery become expensive even when the outer query returns few rows?
833. When can EXISTS express a membership requirement more directly than a join?
834. What risks arise when a scalar subquery unexpectedly returns several rows?
835. How does a cross join affect cardinality when used to generate a reporting grid?
836. Why can filtering before aggregation yield a different result from filtering aggregated groups?
837. How do ROWS and RANGE window frames treat multiple equal ordering values?
838. What is the difference between window partitioning and grouping rows into a smaller result set?
839. How would you define a cumulative distinct count when the database lacks a direct windowed distinct aggregate?
840. How can an outer query change the apparent ordering of an ordered subquery?
841. Why should a primary key's stability be evaluated separately from its uniqueness?
842. When would a natural key need an additional surrogate key for references and evolution?
843. How would you represent a many-to-many relationship that has its own dates and status?
844. What constraints prevent a relationship table from containing duplicate associations?
845. How would you enforce that an employee cannot be their own manager?
846. What parts of hierarchy validity cannot be enforced by a simple foreign key alone?
847. How would you model an address history without overwriting addresses used by past orders?
848. How does storing both a quantity and a derived total create a consistency obligation?
849. When should a calculated column remain computed rather than be written by application code?
850. How would you choose decimal precision and scale from maximum quantity and unit-price requirements?
851. Why can using floating-point columns for exact reconciliation create unexpected mismatches?
852. How would a schema distinguish unknown, not applicable, and intentionally empty values?
853. What migration burden is created by encoding several meanings in one free-text status column?
854. When can a lookup table be preferable to a fixed set of application enum values?
855. How would you represent multilingual labels without making translated text an entity identifier?
856. What tradeoff separates normalized transactional data from a denormalized reporting model?
857. How can a denormalized summary be repaired if its incremental updates drift from source data?
858. How would you model units of measure so arithmetic cannot accidentally combine incompatible quantities?
859. What constraint should enforce that exactly one of two alternative foreign keys is populated?
860. How would you prevent cascading deletion from removing historical evidence that must remain available?
861. How does collation affect uniqueness for strings differing in case or accents?
862. Why can an application and database disagree about whether two Unicode identifiers are equal?
863. How would you choose between storing an instant and a local civil time in a scheduling schema?
864. What information must accompany a timestamp when its original local-time interpretation matters?
865. How would you represent temporal validity intervals without allowing unintended overlaps for one entity?
866. Why can a composite index's column order matter even when every column appears somewhere in a query?
867. How does index key width affect tree depth and cache residency?
868. What makes an index redundant with another index, and what differences can invalidate that conclusion?
869. How would you measure the write cost of an index that appears useful only to a rare report?
870. What distinguishes an index scan from a table scan in the work actually performed?
871. How can random key insertion influence page splits and locality in a tree-based index?
872. When is changing a key-generation strategy preferable to repeatedly rebuilding an index?
873. What determines whether sorting uses memory or spills intermediate work to disk?
874. How can a restrictive memory grant harm a query even when the server has free memory?
875. Why can a query with fewer logical reads still take longer wall-clock time?
876. How would you distinguish database CPU work from waiting on locks, storage, or the client?
877. What does a large gap between first-row time and total-fetch time reveal about a query?
878. How can a slow client hold database resources after execution has produced results?
879. When can increasing fetch size help throughput while increasing client memory pressure?
880. How would you compare prepared statements and ad hoc SQL under a highly varied workload?
881. What behavior changes when SQL executes under an explicit transaction instead of autocommit?
882. How can leaving a transaction open after an exception interfere with unrelated sessions?
883. What is the practical role of savepoints inside a larger database transaction?
884. How would you classify a database exception as safe to retry without repeating committed work?
885. Why does a lock timeout not necessarily imply that the entire transaction was rolled back?
886. How would you document the isolation assumptions behind a multi-query business decision?
887. What can a repeatable-read transaction prevent that a read-committed transaction permits?
888. How does a phantom row differ from a changed value in an already-read row?
889. Why can read-only reporting still affect database cleanup or storage pressure?
890. What operational symptoms indicate excessive transaction-log growth?
891. How would you estimate whether bulk loading should maintain indexes continuously or build them afterward?
892. What validation belongs between staging imported records and making them visible to production queries?
893. How would you preserve source-file line numbers when reporting import errors?
894. What information makes a data correction auditable and reversible?
895. How would you detect a migration script that is safe once but unsafe on accidental rerun?
896. Why should database deployment scripts verify their expected starting schema version?
897. How would you reconcile migration history when a manual production hotfix changed the schema?
898. What verification proves a restored database contains the expected application version and reference data?
899. How would you measure replication lag in terms meaningful to a user-facing read requirement?
900. What differences between backup retention and audit-history retention affect system design?

## Azure infrastructure and operations

901. How would you divide Azure subscriptions when teams need separate billing, access, and deployment boundaries?
902. What responsibilities belong at management-group, subscription, and resource-group scopes?
903. How can an Azure resource group's location differ from the locations of resources it contains?
904. What risks arise from placing unrelated production services in one resource group?
905. How would you use Azure Policy to prevent unsupported resource configurations before deployment?
906. How does auditing a policy violation differ from denying its creation?
907. What should an exception to an organizational Azure policy record about scope and expiry?
908. How would you identify resources that were created outside the approved infrastructure pipeline?
909. Why can tags support cost allocation without providing a security boundary?
910. How would you enforce consistent ownership tags across independently deployed Azure resources?
911. How do Azure resource locks differ from role-based access permissions?
912. What deployment and cleanup operations can be affected by a read-only resource lock?
913. How would you separate permission to deploy infrastructure from permission to read production secrets?
914. What does inherited Azure RBAC access imply when evaluating a resource's effective permissions?
915. How would you investigate unexpected access granted through group membership rather than direct assignment?
916. What controls should accompany temporary elevation through privileged identity management?
917. How would you design an emergency access account that is usable during identity-service disruption?
918. What evidence should a periodic cloud-access review collect before removing unused assignments?
919. How would you migrate a CI pipeline from a stored credential to workload identity federation?
920. What should federated credential matching validate about the token issuer, audience, and subject?
921. How can environment-specific configuration accidentally cause a deployment to authenticate to the wrong Azure tenant?
922. How would you detect a workload that still depends on a departing employee's personal credentials?
923. What network boundaries would you place between public ingress and private application dependencies?
924. How do network security groups and application-level authorization protect different boundaries?
925. How would you diagnose asymmetric routing between an Azure workload and an on-premises service?
926. What information should be compared when a route table unexpectedly sends private traffic through an appliance?
927. How can overlapping address spaces complicate connecting two Azure networks?
928. What considerations determine the address space reserved for future subnet growth?
929. How would you validate DNS resolution from both a developer workstation and an Azure-hosted application?
930. Why can a private DNS zone link be necessary even when network connectivity already exists?
931. How would you investigate outbound connection failures caused by source-port exhaustion?
932. What workload characteristics influence the design of stable outbound IP addresses?
933. How would you choose between a layer-four load balancer and an HTTP-aware gateway?
934. What differences between regional and global ingress matter for failover planning?
935. How should health probes avoid routing traffic to an instance that is alive but cannot serve requests?
936. What can happen when a load-balancer probe bypasses authentication differently from real traffic?
937. How would you prevent an origin service from being accessed directly around its intended gateway?
938. What does TLS termination location change about certificates, inspection, and backend encryption?
939. How would you rotate a gateway certificate while keeping its full trust chain valid?
940. What observations distinguish a gateway timeout from an application-generated timeout?
941. How would you choose App Service scaling rules for a workload dominated by queued background work?
942. What application state becomes unsafe when an App Service scales to several instances?
943. How should an application handle local filesystem contents disappearing when an instance is replaced?
944. What deployment settings should remain slot-specific during an App Service slot swap?
945. How would you test warm-up behavior before a new application instance receives user traffic?
946. What rollback limitations remain after an application release writes a new data format?
947. How would you diagnose an App Service startup failure caused by an unavailable configuration dependency?
948. What distinguishes a container image that starts successfully from one that meets a platform's ingress contract?
949. How would you pin container deployments to immutable image identities rather than mutable tags?
950. What controls prevent a deployment pipeline from pulling an unreviewed image from a registry?
951. How would you choose between a container app job and a continuously running container service?
952. What state must a scheduled container job checkpoint before platform termination?
953. How do minimum replicas influence cold starts and baseline resource consumption?
954. What measurements would justify scaling an Azure container workload on queue length?
955. How can several autoscalers compete when they control dependent parts of one system?
956. What readiness evidence is required before assigning traffic to a new container revision?
957. How would you phase traffic across revisions while preserving compatibility with shared state?
958. What failure modes should be tested before relying on a sidecar for a critical capability?
959. How would you manage certificates and secrets in containers without embedding them in images?
960. What operational differences matter between replacing a container instance and restarting its process?
961. How would you define AKS node pools for workloads with different resource and isolation requirements?
962. What scheduling behavior follows from pod requests compared with resource limits?
963. How would you diagnose a pending pod that has sufficient aggregate cluster capacity but no eligible node?
964. What makes a pod's node-affinity rule different from a soft placement preference?
965. How can a topology-spread rule improve resilience without guaranteeing application-level recovery?
966. What should an AKS upgrade plan verify about deprecated APIs and admission policies?
967. How would you drain a node containing long-running jobs without silently abandoning accepted work?
968. What storage characteristics matter when moving a pod that uses a persistent volume?
969. How would you distinguish a container memory-limit kill from an application exception?
970. What access should an application pod have to the Kubernetes API if it never manages cluster resources?
971. How would you protect an Azure Storage upload endpoint against unexpectedly large or numerous objects?
972. What distinguishes blob versioning from an application-maintained document revision history?
973. How would you choose a storage redundancy option from recovery-point and regional-failure requirements?
974. What read and write behavior should clients expect while a storage failover is in progress?
975. How would you test that a soft-deleted blob can actually be recovered by the operating team?
976. What cost and retrieval implications matter when moving infrequently accessed data to an archive tier?
977. How would you prevent an archived object from being assumed immediately readable by an API?
978. What should an application record when a long-running blob copy has been accepted but not completed?
979. How can object checksums help distinguish successful transport from a correct business document?
980. How would you design blob names to support predictable listing and partitioned processing?
981. How would you distinguish an Azure SQL service limit from an inefficient application query?
982. What should a connection strategy do during transient Azure SQL failover errors?
983. How would you test database recovery to a point before an application corruption event?
984. What concerns determine whether several tenants should share a database or use separate databases?
985. How would you observe the resource fairness of databases sharing an elastic pool?
986. What application assumptions need review before changing a Cosmos DB consistency setting?
987. How would you choose an indexing policy for Cosmos DB documents containing large unused fields?
988. What does a Cosmos DB item's time-to-live imply for downstream projections and audit requirements?
989. How would you avoid mistaking an empty query result for proof that a distributed deletion has propagated?
990. What evidence would justify adding a read region to a globally used data service?
991. How would you design diagnostic settings so a resource's logs remain available after the resource is deleted?
992. What distinctions between metrics and logs matter when setting a low-latency operational alert?
993. How would you test an Azure alert's action group without creating a real outage?
994. What should a cloud budget alert trigger operationally, and what does it not enforce automatically?
995. How would you identify idle cloud capacity without confusing low average utilization with unnecessary capacity?
996. What risks accompany deleting a resource after its usage metrics appear inactive?
997. How would you review an infrastructure plan for replacements that could destroy stateful resources?
998. What parameters should be validated before reusing one infrastructure module across environments?
999. How would you detect a deployment that succeeded in the wrong subscription or region?
1000. What evidence should accompany declaring an Azure disaster-recovery rehearsal successful?
