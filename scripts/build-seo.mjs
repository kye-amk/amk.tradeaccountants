import fs from 'node:fs';
import path from 'node:path';
const config = JSON.parse(fs.readFileSync('seo.config.json', 'utf8'));
const base = config.siteUrl.replace(/\/$/, '');
if (!/^https:\/\/[a-z0-9.-]+$/i.test(base)) throw new Error('Use an HTTPS origin without a path for siteUrl.');
if (config.indexable && /\.vercel\.app$/.test(base)) throw new Error('Confirm the permanent domain before enabling indexing.');
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if(config.indexable && vercel.headers?.some(r=>r.source==='/(.*)'&&r.headers.some(h=>h.key.toLowerCase()==='x-robots-tag'&&h.value.includes('noindex')))) throw new Error('Remove the temporary global noindex header before enabling indexing.');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const homeTitle='Construction & Trade Accountants | CIS, Tax & Bookkeeping | AMK';
const homeDescription='AMK Trade Accountants: CIS, bookkeeping, accounts and tax for sole traders and construction companies. Quarterly reviews and personal support from Kye King.';
const pages={
 'index.html':['/',homeTitle,homeDescription],
 'scroll.html':['/',homeTitle,homeDescription],
 'static.html':['/',homeTitle,homeDescription],
 'privacy.html':['/privacy','Privacy Notice | AMK Trade Accountants','How AMK Financial Services Ltd handles personal information from website visits, enquiries and introductory calls. Your rights and how to contact us.'],
 'cookies.html':['/cookies','Cookie Notice | AMK Trade Accountants','Information about cookies, hosting security and external booking links on the AMK Trade Accountants website. No advertising or analytics trackers.'],
 'website-terms.html':['/website-terms','Website Terms | AMK Trade Accountants','Terms for using the AMK Trade Accountants website, including package information, illustrative examples and the distinction between information and advice.'],
 'complaints.html':['/complaints','Complaints | AMK Trade Accountants','How to raise a complaint with AMK Trade Accountants, what information to provide and what happens when we review your concern.'],
 'accessibility.html':['/accessibility','Accessibility | AMK Trade Accountants','Accessibility features of the AMK Trade Accountants website and how to request another format or report a problem.']
};
const org={
 '@type':'AccountingService','@id':base+'/#business',name:'AMK Trade Accountants',alternateName:'AMK. Trade Accountants',legalName:'AMK Financial Services Ltd',url:base+'/',telephone:config.phone,email:'contact@amkaccountancy.co.uk',vatID:'GB397139357',identifier:{'@type':'PropertyValue',propertyID:'Companies House company number',value:'13592888'},description:'Accounts, tax, CIS and bookkeeping for construction businesses, sole traders and the trades. Quarterly reviews and personal support from Kye King.',image:base+'/amk-consultation.png',address:{'@type':'PostalAddress',name:'Registered office',streetAddress:'20 Nursery End, Stanford In The Vale',addressLocality:'Faringdon',postalCode:'SN7 8PH',addressCountry:'GB'},employee:{'@id':base+'/#kye-king'}
};
const person={'@type':'Person','@id':base+'/#kye-king',name:'Kye King',jobTitle:'Director',worksFor:{'@id':org['@id']},url:base+'/#about',description:'Director at AMK with 8+ years of experience in accountancy. MAAT and CGMA. Supports clients from the first conversation through quarterly reviews and ongoing advice.',hasCredential:[{'@type':'EducationalOccupationalCredential',name:'MAAT — Member of the Association of Accounting Technicians'},{'@type':'EducationalOccupationalCredential',name:'CGMA — Chartered Global Management Accountant'}]};
const services=[['foundation','Foundation','Sole trader accounts, Self Assessment and quarterly MTD for Income Tax updates where required. You keep the books; AMK checks quarterly.'],['build','Build','Monthly bookkeeping, company accounts, Corporation Tax, confirmation statement including filing fee, one director payroll and Self Assessment, and monthly CIS for up to two active subcontractors.'],['develop','Develop','Monthly bookkeeping, company compliance, quarterly management accounts and margin reviews, payroll for up to three people and monthly CIS for up to five active subcontractors.']].map(([id,name,description])=>({'@type':'Service','@id':base+'/#service-'+id,name:name+' accounting package',description,provider:{'@id':org['@id']},url:base+'/#'+id,serviceType:'Accountancy'}));
for(const [file,[route,title,description]] of Object.entries(pages)){
 const p=path.join('dist',file);let html=fs.readFileSync(p,'utf8');
 html=html.replace(/<title>[\s\S]*?<\/title>/i,'').replace(/<meta\s+name="description"[^>]*>/gi,'').replace(/\n?<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\n?/g,'');
 const isHome=route==='/';const duplicate=['static.html','scroll.html'].includes(file);const indexable=config.indexable&&!duplicate;
 const webSite={'@type':'WebSite','@id':base+'/#website',url:base+'/',name:'AMK Trade Accountants',inLanguage:'en-GB',publisher:{'@id':org['@id']}};
 const webpage={'@type':file==='about.html'?'AboutPage':'WebPage','@id':base+route+'#webpage',url:base+route,name:title,description,inLanguage:'en-GB',isPartOf:{'@id':base+'/#website'},about:{'@id':org['@id']}};
 const graph=isHome?[org,person,webSite,webpage,...services]:[webpage,{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:base+'/'},{'@type':'ListItem',position:2,name:title.split(' | ')[0],item:base+route}]}];
 const meta=`\n<!-- SEO:START -->\n<title>${esc(title)}</title>\n<meta name="description" content="${esc(description)}">\n<link rel="canonical" href="${base+route}">\n<meta name="robots" content="${indexable?'index, follow, max-image-preview:large':'noindex, follow'}">\n<meta property="og:type" content="website">\n<meta property="og:locale" content="en_GB">\n<meta property="og:site_name" content="AMK Trade Accountants">\n<meta property="og:title" content="${esc(title)}">\n<meta property="og:description" content="${esc(description)}">\n<meta property="og:url" content="${base+route}">\n<meta property="og:image" content="${base}/amk-consultation.png">\n<meta property="og:image:width" content="1536">\n<meta property="og:image:height" content="1024">\n<meta property="og:image:alt" content="A tradesperson and accountant discussing business in an AMK-branded office">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${esc(title)}">\n<meta name="twitter:description" content="${esc(description)}">\n<meta name="twitter:image" content="${base}/amk-consultation.png">\n<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>\n<!-- SEO:END -->\n`;
 html=html.replace('</head>',meta+'</head>');
 fs.writeFileSync(p,html);
}
// Allow crawlers to read noindex. Do not block pages whose noindex needs to be seen.
fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\n${config.indexable?'\nSitemap: '+base+'/sitemap.xml\n':''}`);
if(config.indexable){
 const routes=[...new Set(Object.values(pages).map(x=>x[0]))];
 fs.writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+routes.map(r=>`  <url><loc>${base+r}</loc></url>`).join('\n')+'\n</urlset>\n');
}else if(fs.existsSync('dist/sitemap.xml'))fs.unlinkSync('dist/sitemap.xml');
console.log(`SEO generated for ${Object.keys(pages).length} pages. Indexing: ${config.indexable?'enabled':'disabled for temporary domain'}.`);
