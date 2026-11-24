import { createElement, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Braces, Database, GitBranch, ScanLine } from 'lucide-react'
import demo from './data/oribi-demo.json'
import './oribi-case-study.css'

const orders = demo.grain.composite.rows
const primaryColumns = Object.keys(orders[0])
const sectionLinks = [['problem', 'Why inspect'], ['pipeline', 'Pipeline'], ['evidence', 'Evidence'], ['outputs', 'Outputs'], ['applications', 'Use cases']]
const grainOptions = [['composite', 'Order lines'], ['single', 'Add a line ID'], ['duplicate', 'Repeat a row']]
const repository = 'https://github.com/samhoon000/Oribi'
const sourceUrl = `${repository}/tree/${demo.revision}`
const percent = value => `${Math.round(value * 100)}%`
const heading = value => value.replaceAll('_', ' ')
const day = value => value.slice(0, 10)

const stages = [
  { name: 'Observe', icon: Database, module: 'api.py → profiling/', title: 'Measure what is in the frame', description: 'Inspect validates the pandas input and reuses per-column observations. Profilers count missing and distinct values, and collect dtype-specific statistics.', facts: ['8 rows × 5 columns', '0 duplicate rows', '4 distinct order IDs'], file: 'oribi/profiling/observations.py' },
  { name: 'Interpret', icon: ScanLine, module: 'reasoning/ + profiling/', title: 'Test hypotheses against the observations', description: 'Semantic rules combine names, types and values. Bounded scans test key candidates and within-frame mappings. Rules then use the evidence to suggest aggregations, surface warnings and infer SQL metrics.', facts: ['2 verified candidate pairs', '1 selected grain estimate', '3 analytical warnings'], file: 'oribi/api.py' },
  { name: 'Capture', icon: GitBranch, module: 'models/context.py', title: 'Save a reusable DatasetContext', description: 'A typed snapshot holds observed statistics alongside provisional roles, grain, relationships and guidance. It has no reference to the input DataFrame.', facts: ['DatasetProfile', 'ColumnContext', 'Evidence + warnings'], file: 'oribi/models/context.py' },
  { name: 'Render', icon: Braces, module: 'serialization/', title: 'Render the same snapshot for different readers', description: 'Serializers format the existing findings for reports, programs or prompts. They read the snapshot without repeating inspection.', facts: ['summary()', 'to_markdown() / to_json()', 'to_context(max_chars=…)'], file: 'oribi/serialization' },
]

const exports = [
  ['input', 'Python input', 'inspect(df)', 'Recreate the synthetic order lines used in the demos.'],
  ['summary', 'Summary', 'context.summary()', 'Shape, inferred grain and the highest-priority warnings.'],
  ['context', 'Prompt context', 'context.to_context(max_chars=1800)', 'Bounded prose for an analyst or a model. Review it before sharing.'],
  ['markdown', 'Markdown', 'context.to_markdown()', 'A human-readable report. Opening excerpt.'],
  ['json', 'JSON', 'context.to_json()', 'A structured projection of the snapshot. Opening excerpt.'],
]

const inputCode = `import pandas as pd\nfrom oribi import inspect\n\ndf = pd.DataFrame({\n${primaryColumns.map(name => {
  const values = orders.map(row => row[name])
  const list = JSON.stringify(name === 'order_date' ? values.map(day) : values).replaceAll(',', ', ')
  return `    "${name}": ${name === 'order_date' ? `pd.to_datetime(${list})` : list},`
}).join('\n')}\n})\ndf["revenue"] = df["revenue"].astype(float)\ncontext = inspect(df)\nprint(context.to_context(max_chars=1800))`

function Options({ label, items, value, onChange }) {
  return <div className="oribi-options" role="group" aria-label={label}>
    {items.map(([id, text]) => <button key={id} type="button" aria-pressed={id === value} onClick={() => onChange(id)}>{text}</button>)}
  </div>
}

function Rows({ rows, columns, highlights = [], duplicateRows = [], compact = false, label }) {
  return <div className="oribi-table-wrap" tabIndex={0} role="region" aria-label={label}>
    <table className="oribi-table">
      <thead><tr><th scope="col">Row</th>{columns.map(name => <th scope="col" key={name} className={highlights.includes(name) ? 'is-marked' : undefined}>{name}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i} className={duplicateRows.includes(i) ? 'is-duplicate' : undefined}>
        <th scope="row">{i + 1}{duplicateRows.includes(i) && <span aria-label="Duplicate values" className="oribi-duplicate-mark"> ↺</span>}</th>
        {columns.map(name => <td key={name} className={highlights.includes(name) ? 'is-marked' : undefined}>{name.endsWith('date') ? (compact ? day(row[name]).slice(5) : day(row[name])) : row[name]}</td>)}
      </tr>)}</tbody>
    </table>
  </div>
}

function Section({ id, number, label, title, intro, className = '', children }) {
  return <section id={id} className={`oribi-section ${className}`} aria-labelledby={`${id}-title`}>
    <div className="section-inner">
      <div className="oribi-section-head oribi-reveal">
        <span className="oribi-kicker">{number} / {label}</span>
        <div><h2 id={`${id}-title`}>{title}</h2><p>{intro}</p></div>
      </div>
      {children}
    </div>
  </section>
}

function Hero({ project, total }) {
  return <header className="oribi-hero">
    <div className="section-inner">
      <div className="case-hero-top"><Link to="/#work"><ArrowLeft size={17} /> SELECTED WORK</Link><span>CASE STUDY / {project.number} OF {String(total).padStart(2, '0')}</span></div>
      <div className="oribi-hero-grid">
        <div className="oribi-hero-copy">
          <p className="oribi-kicker">{project.title} · Python / pandas</p>
          <h1>Know what<br />a row <em>means.</em></h1>
          <p>Oribi inspects a pandas DataFrame and turns its structure, likely grain and analytical risks into evidence you can use before writing a query.</p>
          <a className="oribi-hero-cta" href="#problem">Explore the inspection <ArrowDown size={17} /></a>
        </div>
        <div className="oribi-hero-figure" role="group" aria-label="An order-lines DataFrame becomes structured context">
          <div className="oribi-hero-figure-head"><span><Database size={15} /> Order lines</span><span>First 4 of {orders.length} rows</span></div>
          <Rows rows={orders.slice(0, 4)} columns={['order_id', 'product_id', 'revenue']} highlights={['order_id', 'product_id']} label="First four illustrative order lines" />
          <div className="oribi-hero-flow"><span /><code>inspect(df)</code><span /><ArrowDown size={15} /></div>
          <div className="oribi-hero-result"><span>Likely grain</span><strong>order_id <i>+</i> product_id</strong><small>{demo.grain.composite.grain.evidence[0].statement}</small></div>
        </div>
      </div>
    </div>
  </header>
}

function Problem() {
  const [view, setView] = useState('raw')
  const inspected = view === 'inspected'
  return <div className="oribi-feature oribi-reveal">
    <div className="oribi-panel-head"><h3>How many orders?</h3><Options label="Compare analysis with and without Oribi" items={[["raw", "Raw rows"], ["inspected", "With Oribi"]]} value={view} onChange={setView} /></div>
    <div className="oribi-compare">
      <div className="oribi-compare-input">
        <p className="oribi-small-label">Illustrative order lines · first 4 of 8</p>
        <Rows rows={orders.slice(0, 4)} columns={['order_id', 'product_id', 'revenue']} highlights={inspected ? ['order_id'] : []} label="Order lines for the count comparison" />
      </div>
      <div className="oribi-flow-arrow" aria-hidden="true"><ArrowRight className="oribi-enter" key={view} size={20} /></div>
      <div className="oribi-compare-output" aria-live="polite">
        <div key={view} className="oribi-enter">
          <p className="oribi-small-label">{inspected ? 'Evidence from inspection' : 'Illustrative assumption'}</p>
          <strong>{inspected ? demo.roles[0].distinct : orders.length}</strong>
          <h4>{inspected ? 'distinct order IDs' : 'rows counted as orders'}</h4>
          <code>{inspected ? demo.metrics.find(metric => metric.name === 'order_count').sql : 'COUNT(*)'}</code>
          <p>{inspected ? 'Rows repeat order IDs. Oribi suggests counting distinct IDs for an order count.' : 'Counting rows is valid for line items. Using that number for orders double-counts the repeated IDs in this frame.'}</p>
        </div>
      </div>
    </div>
  </div>
}

function Pipeline() {
  const [active, setActive] = useState(0)
  const stage = stages[active]
  const stageUrl = `${repository}/${stage.file.endsWith('.py') ? 'blob' : 'tree'}/${demo.revision}/${stage.file}`
  return <div className="oribi-pipeline oribi-reveal">
    <div className="oribi-stage-buttons" role="group" aria-label="Inspection stages">
      {stages.map(({ name, icon }, index) => <button type="button" key={name} aria-pressed={index === active} onClick={() => setActive(index)}>
        {createElement(icon, { size: 24, 'aria-hidden': true })}<span>{name}</span><small>0{index + 1}</small>
      </button>)}
    </div>
    <div className="oribi-stage-track" aria-hidden="true"><span style={{ '--oribi-progress': `${(active + 1) / stages.length}` }} /></div>
    <div className="oribi-stage-detail" aria-live="polite">
      <div className="oribi-enter" key={stage.name}><code>{stage.module}</code><h3>{stage.title}</h3><p>{stage.description}</p><a href={stageUrl} target="_blank" rel="noreferrer">Inspect the source <ArrowUpRight size={14} /></a></div>
      <ul className="oribi-stage-facts oribi-enter" key={`${stage.name}-facts`}>{stage.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
    </div>
  </div>
}

function Grain() {
  const [variant, setVariant] = useState('composite')
  const current = demo.grain[variant]
  const columns = variant === 'single' ? ['line_id', 'order_id', 'product_id'] : ['order_id', 'product_id']
  const selected = current.grain.columns.length ? current.grain.columns : columns
  const distinct = new Set(current.rows.map(row => JSON.stringify(selected.map(name => row[name])))).size
  return <article id="grain" className="oribi-feature oribi-reveal" aria-labelledby="oribi-grain-title">
    <div className="oribi-panel-head"><div><span className="oribi-small-label">Keys & grain</span><h3 id="oribi-grain-title">What does a row represent?</h3></div><Options label="Grain examples" items={grainOptions} value={variant} onChange={setVariant} /></div>
    <div className="oribi-split">
      <Rows rows={current.rows} columns={columns} highlights={selected} duplicateRows={current.duplicateRows} label="Order lines with proposed key columns highlighted" />
      <div className="oribi-findings" aria-live="polite"><div className="oribi-enter" key={variant}>
        <p className="oribi-small-label">{heading(current.grain.status)} grain</p><h4>{current.grain.label ?? 'Unresolved'}</h4>
        <div className="oribi-ratio" aria-label={`${distinct} distinct of ${current.rows.length} rows`}><span style={{ '--oribi-progress': distinct / current.rows.length }} /></div>
        <p>{distinct} distinct {selected.length > 1 ? 'pairs' : 'values'} / {current.rows.length} rows</p>
        {current.grain.label && <p>Heuristic confidence <strong>{current.grain.confidence.toFixed(2)}</strong></p>}
        <p>{current.grain.evidence[0].statement}.</p>
        <p className="oribi-small-label">Verified unique in this frame</p>
        {current.keys.length ? <ul className="oribi-key-list">{current.keys.filter(key => key.verified_unique).map(key => <li key={key.columns.join('+')}><code>{key.columns.join(' + ')}</code><span>{key.kind}</span></li>)}</ul> : <p>No qualifying candidates returned.</p>}
      </div></div>
    </div>
    <p className="oribi-note">Each ID repeats on its own in the original example. A distinct pair can still be a coincidence. Confirm the grain with someone who knows how the data was collected.</p>
  </article>
}

function Roles() {
  const [active, setActive] = useState('revenue')
  const column = demo.roles.find(role => role.name === active)
  return <article id="roles" className="oribi-feature oribi-reveal" aria-labelledby="oribi-roles-title">
    <div className="oribi-panel-head"><div><span className="oribi-small-label">Semantic roles</span><h3 id="oribi-roles-title">Read past the dtype.</h3></div></div>
    <div className="oribi-role-buttons" role="group" aria-label="Inspect a column role">
      {demo.roles.map(({ name, semantic }) => <button key={name} type="button" data-role={semantic.role} aria-pressed={name === active} onClick={() => setActive(name)}><code>{name}</code><span>{semantic.role}</span></button>)}
    </div>
    <div className="oribi-split">
      <Rows rows={orders.slice(0, 4)} columns={primaryColumns} highlights={[active]} compact label="First four order lines with the selected role highlighted" />
      <div className="oribi-findings" aria-live="polite"><div className="oribi-enter" key={active}>
        <p className="oribi-small-label">{column.dtype} → likely {column.semantic.role}</p><h4>{column.name}</h4>
        <p>{column.distinct} distinct values across {orders.length} rows · {column.semantic.confidence.toFixed(2)} confidence</p>
        <ul className="oribi-evidence-list">{column.semantic.evidence.filter(item => item.statement).slice(0, 4).map(item => <li key={item.code}>{item.statement}</li>)}</ul>
      </div></div>
    </div>
  </article>
}

const relationships = demo.relationships.map(relation => {
  const mappingRows = relation.mapping_cardinality === 'one_to_many' ? demo.grain.single.rows : orders
  const pairs = [...new Map(mappingRows.map(row => {
    const values = [relation.source_column, relation.target_column].map(name => name.endsWith('date') ? day(row[name]).slice(5) : String(row[name]))
    return [JSON.stringify(values), values]
  })).values()]
  return { ...relation, pairs, from: [...new Set(pairs.map(pair => pair[0]))], to: [...new Set(pairs.map(pair => pair[1]))] }
})

function Relationships() {
  const [active, setActive] = useState('many_to_one')
  const relation = relationships.find(item => item.mapping_cardinality === active)
  const nodeY = (count, index) => (index + .5) * 100 / count
  return <article id="relationships" className="oribi-feature oribi-reveal" aria-labelledby="oribi-relationships-title">
    <div className="oribi-panel-head"><div><span className="oribi-small-label">Relationships</span><h3 id="oribi-relationships-title">Follow a mapping.</h3></div><Options label="Relationship examples" items={relationships.map(item => [item.mapping_cardinality, heading(item.mapping_cardinality)])} value={active} onChange={setActive} /></div>
    <div className="oribi-split">
      <div className="oribi-graph" key={active}>
        <div className="oribi-graph-head"><code>{relation.source_column}</code><ArrowRight size={15} aria-hidden="true" /><code>{relation.target_column}</code></div>
        <div className="oribi-graph-body">
          <ul>{relation.from.map(name => <li key={name}>{name}</li>)}</ul>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {relation.pairs.map(([from, to], i) => {
              const y1 = nodeY(relation.from.length, relation.from.indexOf(from))
              const y2 = nodeY(relation.to.length, relation.to.indexOf(to))
              return <path key={`${from}-${to}`} d={`M1 ${y1} C42 ${y1},58 ${y2},99 ${y2}`} style={{ '--oribi-delay': `${i * 45}ms` }} />
            })}
          </svg>
          <ul>{relation.to.map(name => <li key={name}>{name}</li>)}</ul>
        </div>
        <details className="oribi-graph-values"><summary>View observed pairs</summary><ul>{relation.pairs.map(([from, to]) => <li key={`${from}-${to}`}>{from} maps to {to}</li>)}</ul></details>
      </div>
      <div className="oribi-findings" aria-live="polite"><div key={active} className="oribi-enter">
        <p className="oribi-small-label">{heading(relation.kind)}</p><h4>{heading(active)}</h4>
        <p><strong>{percent(relation.coverage)}</strong> coverage of observed source values.</p>
        {active === 'one_to_many' ? <p>This example uses the variant with a unique <code>line_id</code>.</p> : <p>Each {relation.source_column} maps to one {relation.target_column} in these rows.</p>}
        <p>This is evidence inside one DataFrame. Verify join keys, coverage and multiplicity separately for any tables you plan to join.</p>
      </div></div>
    </div>
  </article>
}

const qualityByDay = new Map(demo.quality.rows.map(row => [Number(day(row.date).slice(-2)), row.revenue]))
const qualityDays = Array.from({ length: Math.max(...qualityByDay.keys()) }, (_, i) => i + 1)
const maxRevenue = Math.max(...qualityByDay.values())

function Quality() {
  const [active, setActive] = useState('potential_temporal_gap')
  const warning = demo.quality.warnings.find(item => item.code === active)
  return <article id="warnings" className="oribi-feature oribi-reveal" aria-labelledby="oribi-quality-title">
    <div className="oribi-panel-head"><div><span className="oribi-small-label">Warnings</span><h3 id="oribi-quality-title">A missing day or a missing value?</h3></div><Options label="Data quality warnings" items={[["potential_temporal_gap", "Temporal gap"], ["high_missingness", "Missing values"]]} value={active} onChange={setActive} /></div>
    <div className="oribi-split">
      <div className="oribi-chart">
        <p className="oribi-small-label">Illustrative daily revenue · January</p>
        <ol className="oribi-chart-days" aria-label="Daily values and missing observations">
          {qualityDays.map(date => {
            const value = qualityByDay.get(date)
            const state = value === undefined ? 'gap' : value === null ? 'null' : 'observed'
            const selected = (state === 'gap' && active === 'potential_temporal_gap') || (state === 'null' && active === 'high_missingness')
            const description = value === undefined ? 'no row' : value === null ? 'row with missing revenue' : `revenue ${value}`
            return <li key={date} data-state={state} data-highlight={selected} aria-label={`January ${date}: ${description}`}>
              <div className="oribi-bar-track" aria-hidden="true"><div className="oribi-bar" style={{ '--oribi-bar-size': `${value == null ? 10 : value / maxRevenue * 100}%` }} key={selected}>{value != null && <span className="oribi-bar-value">{value}</span>}</div>{value == null && <span>{state === 'gap' ? '×' : '–'}</span>}</div><small>{String(date).padStart(2, '0')}</small>
            </li>
          })}
        </ol>
        <p className="oribi-chart-legend"><span>× No row</span><span>– Null in existing row</span></p>
      </div>
      <div className="oribi-findings" aria-live="polite"><div className="oribi-enter" key={active}>
        <p className="oribi-small-label">{warning.severity} severity</p><h4>{warning.title}</h4><p>{warning.message}</p>
        <p>{active === 'potential_temporal_gap' ? 'January 05 is absent from this example. Oribi infers a cadence on eligible datetime values and reports potential gaps for review.' : 'Four of the eight recorded rows have null revenue. The absent date is outside the denominator.'}</p>
      </div></div>
    </div>
  </article>
}

function Metrics() {
  const [active, setActive] = useState('order_count')
  const metrics = demo.metrics.filter(metric => ['order_count', 'total_revenue', 'average_order_value'].includes(metric.name))
  const selected = metrics.find(metric => metric.name === active)
  return <article id="metrics" className="oribi-feature oribi-metrics oribi-reveal" aria-labelledby="oribi-metrics-title">
    <div className="oribi-panel-head"><div><span className="oribi-small-label">Analytical metrics</span><h3 id="oribi-metrics-title">Match the SQL to the grain.</h3></div><Options label="Inferred SQL definitions" items={metrics.map(metric => [metric.name, metric.label])} value={active} onChange={setActive} /></div>
    <div className="oribi-metric-output" aria-live="polite"><div className="oribi-enter" key={active}><pre><code>{selected.sql}</code></pre><p>{selected.rationale}</p>{selected.caveats.length > 0 && <ul>{selected.caveats.map(caveat => <li key={caveat}>{caveat}</li>)}</ul>}</div></div>
    <p className="oribi-note">Oribi suggests SQL definitions from observed roles, grain and relationships. Review the metric definition and run it in your own query environment.</p>
  </article>
}

function Outputs() {
  const [active, setActive] = useState('context')
  const [, , method, description] = exports.find(([key]) => key === active)
  const code = active === 'input' ? inputCode : demo.exports[active]
  return <div className="oribi-terminal oribi-reveal">
    <div className="oribi-terminal-top"><div className="oribi-terminal-flow"><Database size={16} /> <span>DataFrame</span><ArrowRight size={15} /><code>inspect(df)</code><ArrowRight size={15} /><span>DatasetContext</span></div><Options label="Input and output formats" items={exports.map(([key, label]) => [key, label])} value={active} onChange={setActive} /></div>
    <div className="oribi-terminal-caption" aria-live="polite"><code>{method}</code><span>{description}</span></div>
    <pre className="oribi-terminal-code" tabIndex={0} aria-label={`${method} example`}><code className="oribi-enter" key={active}>{code}</code></pre>
    <p className="oribi-terminal-foot">Oribi {demo.version} · Synthetic inputs · Exports use default value redaction</p>
  </div>
}

export default function OribiCaseStudy({ project, total, children }) {
  const page = useRef(null)
  useEffect(() => {
    const container = page.current
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        target.classList.add('in-view')
        observer.unobserve(target)
      })
    }, { threshold: .06 })
    container.querySelectorAll('.oribi-reveal').forEach(node => observer.observe(node))
    const anchor = document.getElementById(window.location.hash.slice(1))
    anchor?.scrollIntoView()
    return () => observer.disconnect()
  }, [])

  return <main ref={page} id="main" className="case-page case-page--cyan oribi-case">
    <Hero project={project} total={total} />
    <nav className="oribi-nav" aria-label="On this page"><div className="section-inner">{sectionLinks.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>
    <Section id="problem" number="01" label="The problem" title="A table shows values. Context explains structure." intro="Rows, entities and measures can look alike at first glance. Compare two ways to answer the same question from the example frame."><Problem /></Section>
    <Section id="pipeline" number="02" label="Architecture" title="From pandas to a typed snapshot." intro="Follow the stages of inspect(df) and see what each contributes to the result." className="oribi-dark"><Pipeline /></Section>
    <Section id="evidence" number="03" label="Evidence lab" title="See the reasoning in the data." intro="Change the example or select a finding to explore outputs captured from Oribi. All input data is synthetic.">
      <nav className="oribi-lab-nav" aria-label="Evidence demonstrations">{[['grain', 'Grain'], ['roles', 'Column roles'], ['relationships', 'Relationships'], ['warnings', 'Warnings'], ['metrics', 'SQL metrics']].map(([id, label]) => <a href={`#${id}`} key={id}>{label} <ArrowDown size={12} aria-hidden="true" /></a>)}</nav>
      <div className="oribi-lab"><Grain /><Roles /><Relationships /><Quality /><Metrics /></div>
    </Section>
    <Section id="outputs" number="04" label="Formats" title="One inspection, several views." intro="Read the same DatasetContext as a short diagnostic, a report, structured data or a bounded prompt context." className="oribi-dark"><Outputs /></Section>
    <Section id="applications" number="05" label="Practical use" title="Start with the evidence." intro="Use the report to scope analysis, check your aggregations and give a downstream model enough context to ask better questions.">
      <div className="oribi-use-grid oribi-reveal">
        <article><h3>Before analysis</h3><p>Check row grain, choose how to count entities and review missingness before designing charts or querying the data.</p></article>
        <article><h3>Before sharing</h3><p>Inspection runs locally. Exports omit sampled values by default. Review the remaining column names, counts and statistics before sharing any report.</p></article>
        <article><h3>Where it stops</h3><p>The profile covers one in-memory pandas DataFrame. It has no join engine, outlier detector or AI-provider integration. Review heuristic scores and inferred business meanings with a domain expert.</p></article>
      </div>
      <div className="oribi-source-strip oribi-reveal"><div><code>python -m pip install oribi</code><small>Examples verified at revision <a href={sourceUrl} target="_blank" rel="noreferrer">{demo.revision.slice(0, 7)}</a></small></div><div><a href={project.repo} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a><a href="https://pypi.org/project/oribi/" target="_blank" rel="noreferrer">PyPI <ArrowUpRight size={17} /></a></div></div>
      <details className="oribi-options-details"><summary>Profiling limits</summary><p>The default <code>max_exact_rows</code> limit is {demo.options.maxExactRows.toLocaleString('en-US')} rows. Above it, Oribi skips exact numeric quantiles, composite-key searches and relationship scans. Candidate and relationship scans also respect their column limits.</p><code>{demo.options.limitedExample}</code></details>
    </Section>
    {children}
  </main>
}
