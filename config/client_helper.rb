require 'nokogiri'

class ClientHelper
	def ClientHelper.js_links content, relative_to_path, disclude=[]
		if disclude.size == 0
			disclude = nil
		else
			disclude = Regexp.new "(#{disclude.join('|')})"
		end

		result = []
		Nokogiri::HTML.parse(content).css("script[src]").each do |sc| 
			if disclude and not sc['src'] =~ disclude
				result << relative_to_path + sc['src'] 
			end
		end
		result
	end

	def ClientHelper.css_links content, relative_to_path
		Nokogiri::HTML.parse(content).css("link[rel='stylesheet']").map do |css_tag| 
			relative_to_path + css_tag['href'] if css_tag['no-include'].nil?
		end
	end
end